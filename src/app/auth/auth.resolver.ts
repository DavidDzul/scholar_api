import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
// import { User } from 'entities/user.entity';
import { RegisterUserInput } from './dto';
import { UsersService } from '../users/users.service';
import { BadRequestException, Logger } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name);
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Query(() => String)
  profile() {
    return this.authService.getProfile();
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
