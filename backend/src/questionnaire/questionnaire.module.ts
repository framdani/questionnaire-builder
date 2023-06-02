import { Module } from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireResolver } from './questionnaire.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [QuestionnaireResolver, QuestionnaireService, PrismaService, ]
})
export class QuestionnaireModule {}
