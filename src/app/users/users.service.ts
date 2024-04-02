import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto';
import { RegisterUserInput } from '../auth/dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.usersRepository.create({
      ...createUserInput,
    });
    return this.usersRepository.save(user);
  }

  async register(registerUserInput: RegisterUserInput) {
    const user = await this.usersRepository.create({
      ...registerUserInput,
      active: true,
    });
    return this.usersRepository.save(user);
  }

  findOneByEmail(email: string, fail = true) {
    if (fail) {
      return this.usersRepository.findOneOrFail({
        where: { email: email },
        select: ['id', 'email', 'password', 'active'],
      });
    }
    return this.usersRepository.findOne({
      where: { email: email },
    });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id: id } });
  }
}
