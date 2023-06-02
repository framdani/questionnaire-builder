import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { PrismaExceptionFilter } from './exceptions/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors()
  app.use(cors());
  app.useGlobalFilters(new PrismaExceptionFilter())
  await app.listen(3000);
  
}
bootstrap();
