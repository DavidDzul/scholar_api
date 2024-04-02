// NestJS Modules
import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
}
