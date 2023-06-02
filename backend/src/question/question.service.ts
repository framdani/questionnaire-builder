import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(private prismaService:PrismaService){}


  async create(text:string, sectionId:number){
            let section = await this.prismaService.section.findUnique({where:{id:sectionId}})
            if (!section)
                throw new Error('Section not found !')
                const question = this.prismaService.question.create({
                    data:{
                        text,
                        section :{connect :{id:sectionId}}
                    }
                })
            return question;
  }

    async update(questionId:number, text:string ){
              await this.prismaService.question.update({
                  where:{id : questionId},
                  data :{text:text}
              })
              return true;
    }

    async remove(id:number){
          await this.prismaService.question.delete({where :{id}})
          return true
      
    }


    async findAll(sectionId:number) {
    return await this.prismaService.question.findMany({where:{sectionId}})
  }
}

