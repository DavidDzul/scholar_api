import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, Int } from '@nestjs/graphql';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ unique: true, nullable: false })
  @Field()
  email: string;

  @Column({ nullable: false })
  @Field()
  password: string;

  @Column({ default: true })
  @Field()
  active: boolean;

  @CreateDateColumn()
  @Field()
  createdAt: string;

  @UpdateDateColumn()
  @Field()
  updatedAt: string;
}
