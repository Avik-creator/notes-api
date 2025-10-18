import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createNoteDto: CreateNoteDto,
    @Request()
    req: {
      user: {
        sub: number;
      };
    },
  ) {
    return this.noteService.create(createNoteDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Request()
    req: {
      user: {
        sub: number;
      };
    },
    @Query('take') take?: string,
    @Query('skip') skip?: string,
  ) {
    return this.noteService.findAll(req.user.sub, take, skip);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request()
    req: {
      user: {
        sub: number;
      };
    },
  ) {
    return this.noteService.findOne(+id, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request()
    req: {
      user: {
        sub: number;
      };
    },
  ) {
    return this.noteService.update(+id, updateNoteDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request()
    req: {
      user: {
        sub: number;
      };
    },
  ) {
    return this.noteService.remove(+id, req.user.sub);
  }
}
