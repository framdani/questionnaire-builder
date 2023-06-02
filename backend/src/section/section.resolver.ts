import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SectionService } from './section.service';
import { Section } from './entities/section.entity';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';

@Resolver(() => Section)
export class SectionResolver {
  constructor(private readonly sectionService: SectionService) {}

  @Mutation(() => Section)
  async createSection(@Args('name')name:string, @Args('id')id:number) {
    return await this.sectionService.create(name, id);
  }

  @Query(() => [Section], { name: 'section' })
  async findAll(@Args('id')id:number) {
    return await this.sectionService.findAll(id);
  }

  // @Query(() => Section, { name: 'section' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.sectionService.findOne(id);
  // }

  @Mutation(() => Boolean)
  updateSection(@Args('id')id:number,
  @Args('name')name:string) {
    return this.sectionService.update(id, name);
  }

  @Mutation(() => Boolean)
  async removeSection(@Args('id')id:number) {
    return await this.sectionService.remove(id);
  }
}
