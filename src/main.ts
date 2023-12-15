/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { GqlAuthGuard } from './common/guards/auth.guard';
import { GqlAuthModule } from './graphql/auth/gql-auth.module';
import { GqlAuthGuard } from './graphql/auth/gql-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const gqlAuthGuard = app.select(GqlAuthModule).get(GqlAuthGuard);
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.useGlobalGuards(gqlAuthGuard);
  await app.listen(3000, () => console.log('http://localhost:3000/graphql'));
}
bootstrap();
