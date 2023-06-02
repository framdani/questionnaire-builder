import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Question } from 'src/question/entities/question.entity';

@ObjectType()
export class Section{
  @Field(() => ID)
  id!: number;

  @Field(()=>String)
  name!: string;

  @Field(() =>[Question], {nullable:true})
  questions?:Question[]
}
