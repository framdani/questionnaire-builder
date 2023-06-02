import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire } from './entities/questionnaire.entity';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { UseFilters } from '@nestjs/common';

@Resolver(() => Questionnaire)
export class QuestionnaireResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {}

  @Mutation(() => Questionnaire)
  createQuestionnaire(@Args('name')name:string) {
    return this.questionnaireService.create(name);
  }

  @Query(() => [Questionnaire], { name: 'questionnaire' })
  async findAll() {
    return await this.questionnaireService.findAll();
   
  }

  // @Query(() => Questionnaire, { name: 'questionnaire' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionnaireService.findOne(id);
  // }

  @Mutation(() => Boolean)
  async updateQuestionnaire(@Args('id')id:number, @Args('name')name:string) {
    return await this.questionnaireService.update(id, name);
  }

  @Mutation(() => Boolean)
  async removeQuestionnaire(@Args('id')id:number) {
    return await this.questionnaireService.remove(id);
  }
}
