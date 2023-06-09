import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [QuestionResolver, QuestionService, PrismaService]
})
export class QuestionModule {}
