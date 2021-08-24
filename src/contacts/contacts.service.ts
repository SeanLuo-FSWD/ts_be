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
    const email = CreateContactDto.email;
    const message = CreateContactDto.message.trim();
    const user = await this.userRepository.findOne(
      { email },
      { relations: ['messages'] },
    );

    console.log('aaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(user);

    let savedUser;
    if (!user) {
      const newUser = this.userRepository.create({
        ...CreateContactDto,
      });

      if (message) {
        const newMsg = this.messageRepository.create();
        newMsg.text = message;
        newUser.messages = [newMsg];
      }
      savedUser = this.userRepository.save(newUser);
    } else {
      if (message) {
        const newMsg = this.messageRepository.create();
        newMsg.text = message;
        console.log('bbbbbbbbbbbbbbbbbb');
        console.log(newMsg);

        // user.messages = [newMsg];
        user.messages.push(newMsg);
        savedUser = this.userRepository.save(user);
      }
    }

    return savedUser || '';
  }
}
