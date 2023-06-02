import { Injectable } from '@nestjs/common';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectionService {
  constructor(private prismaService:PrismaService){}

  async create(name:string, id:number) {
    let qst = await this.prismaService.questionnaire.findUnique({where:{id}})
            if (!qst)
                throw new Error('Questionnaire not found !')
    
            const section= this.prismaService.section.create({
               data:{ name,
                questionnaire: { connect: { id: id } }
               }
              }
            );
        return section;
  }

  async findAll(questionnaireId:number) {
    return  await this.prismaService.section.findMany({where:{questionnaireId}, include:{questions:true}})
  }


  async update(sectionId:number, newName:string) {
    const updatedSection = await this.prismaService.section.update({
                  where: { id: sectionId },
                  data: { name: newName},
                });
    return true;
  }

  async remove(sectionId: number) {
    await this.prismaService.$transaction(async (prisma) => {
      await prisma.question.deleteMany({
          where: { sectionId },
        });
      await prisma.section.delete({
        where: { id: sectionId },
      });
    });
    return true;
  }
}
