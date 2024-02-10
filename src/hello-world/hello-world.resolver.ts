import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, { name: 'firstQuery' })
  helloWorld(): string {
    return 'Hola mundo';
  }
}
