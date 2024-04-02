import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'libs/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User>> {
    try {
      const user = await this.usersService.findOneByEmail(email);
      const passOk = await bcrypt.compare(pass, user.password);
      if (user && passOk) {
        this.logger.log(`User with email: ${email} validated.`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
      this.logger.log(`User with email: ${email} fail validation.`);
      return null;
    } catch (e) {
      this.logger.log(`User with email: ${email} fail validation.`);
      return null;
    }
  }

  async login(user: Partial<User>): Promise<string> {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }

  async getProfile(id: number) {
    try {
      const user = await this.usersService.findOne(id);
      this.logger.log(`User with email: ${user.email} get profile.`);
      if (user) {
        return user;
      }
      return null;
    } catch (e) {
      return null;
    }
  }
}
