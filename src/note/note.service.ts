import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from 'src/prisma.service';
import { Logger } from '@nestjs/common';
import { PrismaClientUnknownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class NoteService {
  private logger = new Logger(NoteService.name);
  constructor(private readonly prismaService: PrismaService) {}
  async create(createNoteDto: CreateNoteDto, userId: number) {
    const note = await this.prismaService.note.create({
      data: {
        title: createNoteDto.title,
        body: createNoteDto.content,
        userId: userId,
      },
    });
    this.logger.log(`Note created with ID: ${note.id} by User ID: ${userId}`);
    return note;
  }

  async findAll(userId: number, take?: string, skip?: string) {
    const allNotes = await this.prismaService.note.findMany({
      where: { userId: userId },
      take: take ? parseInt(take) : 10,
      skip: skip ? parseInt(skip) : 0,
    });
    return allNotes;
  }

  async findOne(id: number, userId: number) {
    const note = await this.prismaService.note.findUnique({
      where: { id: id, userId: userId },
    });
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const note = await this.prismaService.note.findFirst({
      where: { id: id },
    });
    if (!note || note.userId !== userId) {
      this.logger.warn(
        `Unauthorized update attempt for Note ID: ${id} by User ID: ${userId}`,
      );
      throw new Error('Note not found or unauthorized');
    }
    const updatedNote = await this.prismaService.note.update({
      where: { id: id },
      data: {
        title: updateNoteDto.title,
        body: updateNoteDto.content,
      },
    });
    this.logger.log(`Note ID: ${id} updated by User ID: ${userId}`);
    return updatedNote;
  }

  async remove(id: number, userId: number) {
    try {
      await this.prismaService.note.delete({
        where: { id, userId },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientUnknownRequestError) {
        if (error.code === 'P2025') {
          this.logger.warn(
            `Unauthorized delete attempt for Note ID: ${id} by User ID: ${userId}`,
          );
          throw new Error('Note not found or unauthorized');
        }
      }
      throw error;
    }
  }
}
