import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  // Shouldn't we have a column to tie back to contacts?

  @ManyToOne((type) => User, (user) => user.messages)
  user: User[];
}
