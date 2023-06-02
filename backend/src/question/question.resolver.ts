import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(@Args('text')text:string, @Args('id')id:number) {
    return await this.questionService.create(text, id);
  }

  @Query(() => [Question], { name: 'question' })
  async findAll(@Args('id')id:number) {
    return await this.questionService.findAll(id);
  }

  // @Query(() => Question, { name: 'question' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionService.findOne(id);
  // }

  @Mutation(() => Boolean)
  async updateQuestion(@Args('text')text:string, @Args('id')id:number) {
    return await this.questionService.update(id, text);
  }

  @Mutation(() => Boolean)
  async removeQuestion(@Args('id')id:number) {
    return await this.questionService.remove(id);
  }
}
