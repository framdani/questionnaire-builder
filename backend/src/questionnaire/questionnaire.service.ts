import { Injectable, UseFilters } from '@nestjs/common';
import { CreateQuestionnaireInput } from './dto/create-questionnaire.input';
import { UpdateQuestionnaireInput } from './dto/update-questionnaire.input';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class QuestionnaireService {
  constructor(private prismaService:PrismaService){}

  async create(name:string) {

    return await this.prismaService.questionnaire.create({data :{name:name}})
  
  }

  async findAll() {
    return await this.prismaService.questionnaire.findMany({include:{sections:true}});
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} questionnaire`;
  // }

  async update(id:number,name:string) {
    await this.prismaService.questionnaire.update({
                  where:{id},
                  data :{name:name}
              })
              return true;
  }

  async remove(id: number) {
    await this.prismaService.$transaction(async (prisma) => {
                  await prisma.question.deleteMany({
                    where: { section: { questionnaireId: id } },
                  });
              
                  await prisma.section.deleteMany({
                    where: { questionnaireId: id },
                  });
              
                  const questionnaire = await prisma.questionnaire.delete({
                    where: { id },
                  });
              
                  return questionnaire;
                });
              
                return true;
  }
}
