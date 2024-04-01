// NestJS Modules
import { Field, InputType } from '@nestjs/graphql';
// Third-Party Libraries

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
