import { User } from 'libs/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto';
import { RegisterUserInput } from '../auth/dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserInput: CreateUserInput): Promise<User>;
    register(registerUserInput: RegisterUserInput): Promise<User>;
    findOneByEmail(email: string, fail?: boolean): Promise<User>;
    findOne(id: number): Promise<User>;
}
