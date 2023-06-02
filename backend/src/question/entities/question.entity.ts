import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Question {
  @Field(() => ID)
  id!: number;

  @Field(()=>String)
  text?: string;
}