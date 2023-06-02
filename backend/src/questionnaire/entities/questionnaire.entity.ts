import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Section } from 'src/section/entities/section.entity';

@ObjectType()
export class Questionnaire {
  @Field(() => ID)
  id!: number;

  @Field(()=>String)
  name!: string;

  @Field(() =>[Section], {nullable:true})
  sections?:Section[]
}
