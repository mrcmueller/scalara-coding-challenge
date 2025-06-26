import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BeziehungenService } from './beziehungen.service';
import { Beziehung } from '@/generated/prisma';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto copy';

@Controller('beziehungen')
export class BeziehungenController {
  constructor(private readonly beziehungenService: BeziehungenService) {}

  @Get()
  async beziehungen(): Promise<Beziehung[]> {
    return await this.beziehungenService.beziehungen();
  }

  @Get()
  async beziehung(id: string): Promise<Beziehung | null> {
    return await this.beziehungenService.beziehung(id);
  }

  @Post()
  async erstelleBeziehung(
    @Body()
    input: BeziehungErstellenDto,
  ): Promise<Beziehung> {
    return await this.beziehungenService.erstelleBeziehung(input);
  }

  @Patch('/:id')
  async aendereBeziehung(
    @Param('id')
    id: string,
    @Body()
    input: BeziehungErstellenDto,
  ): Promise<Beziehung> {
    return await this.beziehungenService.aendereBeziehung(id, input);
  }

  @Delete('/:id')
  async loescheBeziehung(id: string): Promise<Beziehung> {
    return await this.beziehungenService.loescheBeziehung(id);
  }
}
