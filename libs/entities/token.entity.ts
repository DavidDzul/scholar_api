// NestJS Modules
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field()
  token: string;
}
