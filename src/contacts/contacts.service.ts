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
  ) // @InjectRepository(Message)
  // private readonly flavorRepository: Repository<Message>,
  {}

  async create(CreateContactDto: CreateContactDto) {
    const user = this.userRepository.create({
      ...CreateContactDto,
    });
    return this.userRepository.save(user);
  }
}
