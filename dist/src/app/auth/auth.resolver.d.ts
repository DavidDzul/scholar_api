import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto';
import { UsersService } from '../users/users.service';
import { Token, User } from 'libs/entities';
export declare class AuthResolver {
    private readonly authService;
    private readonly usersService;
    private readonly logger;
    constructor(authService: AuthService, usersService: UsersService);
    profile(user: User): Promise<User>;
    login(email: string, password: string): Promise<Token>;
    register(registerUserInput: RegisterUserInput): Promise<string>;
}
