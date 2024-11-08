import { UsersService } from '../users/users.service';
import { User } from 'libs/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<Partial<User>>;
    login(user: Partial<User>): Promise<string>;
    getProfile(id: number): Promise<User>;
}
