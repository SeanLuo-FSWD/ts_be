import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { User } from './entities/user.entity';
import { Message } from './entities/message.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async create(CreateContactDto: CreateContactDto) {
    console.log('ContactsServicecreatecalled');

    const email = CreateContactDto.email.toLocaleLowerCase();
    const message = CreateContactDto.message.trim();
    const hdyh = CreateContactDto.hdyh.trim();

    const user = await this.userRepository.findOne(
      { email },
      { relations: ['messages'] },
    );

    let savedUser = 'existing';
    if (!user) {
      const newUser = this.userRepository.create({
        ...CreateContactDto,
        email: email.toLocaleLowerCase(),
      });

      if (message) {
        const newMsg = this.messageRepository.create();
        newMsg.text = message;
        newUser.messages = [newMsg];
      }
      this.userRepository.save(newUser);
      savedUser = 'new';
    } else if (message || hdyh) {
      if (message) {
        // here we want to add msg only if its new.
        // const msg_arr = await this.messageRepository.find({
        //     where: { userId: user.id },
        // });

        const msg_arr = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.messages', 'messages')
          .where('user.id = :userId', { userId: user.id })
          .andWhere('messages.text LIKE :text', { text: message })
          .select('messages.text')
          .execute();

        console.log(msg_arr);

        if (msg_arr.length === 0) {
          // push only if a new message.
          const newMsg = this.messageRepository.create();
          newMsg.text = message;
          user.messages.push(newMsg);
        }
      }

      if (hdyh) {
        // here we want to replace this.
        user.hdyh = hdyh;
      }
      this.userRepository.save(user);
    }

    return savedUser || '';
  }
}
