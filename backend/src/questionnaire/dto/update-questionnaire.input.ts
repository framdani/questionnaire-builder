import { CreateQuestionnaireInput } from './create-questionnaire.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionnaireInput extends PartialType(CreateQuestionnaireInput) {
  @Field(() => Int)
  id: number;
}
