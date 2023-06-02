import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql'

import { QuestionModule } from './question/question.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { SectionModule } from './section/section.module';
import { QuestionnaireResolver } from './questionnaire/questionnaire.resolver';
import { SectionResolver } from './section/section.resolver';
import { QuestionResolver } from './question/question.resolver';
import { PrismaService } from './prisma/prisma.service';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

@Module({
  imports: [ 
    //Configure graphQL with APOLLO server
    GraphQLModule.forRoot<ApolloDriverConfig>({autoSchemaFile: 'src/graphql/schema.graphql',driver: ApolloDriver}),
    QuestionModule,
    QuestionnaireModule,
    SectionModule,
  ],
  controllers: [],
  providers: [PrismaService,  {
    provide: APP_FILTER,
    useFactory: ({ httpAdapter }: HttpAdapterHost) => {
      return new PrismaClientExceptionFilter(httpAdapter);
    },
    inject: [HttpAdapterHost],
  },],
})
export class AppModule {}
