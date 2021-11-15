import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './note.entity';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class Note {}
