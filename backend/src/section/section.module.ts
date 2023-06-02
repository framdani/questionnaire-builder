import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionResolver } from './section.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SectionResolver, SectionService, PrismaService]
})
export class SectionModule {}
