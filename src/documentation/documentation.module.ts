import { Module } from '@nestjs/common';
import { DocumentationService } from './documentation.service';
import { DocumentationController } from './documentation.controller';
import { Documentation } from './entities/documentation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DocumentationController],
  providers: [DocumentationService],
  imports: [TypeOrmModule.forFeature([Documentation])],
})
export class DocumentationModule {}
