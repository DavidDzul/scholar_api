import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { RegisterUserInput } from './dto';
import { UsersService } from '../users/users.service';
import {
  BadRequestException,
  Logger,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Token, User } from 'libs/entities';
import { GqlAuthGuard } from './guards/';
import { CurrentUser } from './decorators';

@Resolver(() => User)
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  profile(@CurrentUser('user') user: User) {
    return this.authService.getProfile(user.id);
  }

  @Mutation(() => Token)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
      });
    }
    if (!user.active) {
      throw new UnauthorizedException({
        status: 401,
        message:
          'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
      });
    }
    this.logger.log(`User with email: ${email} logged in.`);
    const token: Token = { token: await this.authService.login(user) };
    return token;
  }

  @Mutation(() => String)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ) {
    if (
      await this.usersService.findOneByEmail(registerUserInput.email, false)
    ) {
      this.logger.log('Register User Fail: Duplicate Email');
      throw new BadRequestException({
        status: 400,
        message: 'Error',
      });
    }
    const user = await this.usersService.register(registerUserInput);
    this.logger.log(`User with email: ${user.email} created.`);
    return 'Registro realizado con éxito.';
  }
}
