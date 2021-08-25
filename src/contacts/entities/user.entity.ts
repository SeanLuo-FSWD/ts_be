import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // decorate id as PK, and auto increment it.
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  hdyh: string;

  @JoinTable()
  @OneToMany((type) => Message, (message) => message.user, {
    cascade: true,
  })
  messages: Message[];
}
