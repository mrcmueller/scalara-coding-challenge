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
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto copy';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';

@Controller('beziehungen')
export class BeziehungenController {
  constructor(private readonly beziehungenService: BeziehungenService) {}

  @Get()
  async beziehungen(): Promise<BeziehungMitPayloadsQuery[]> {
    return await this.beziehungenService.beziehungen();
  }

  @Get()
  async beziehung(
    @Param('id')
    id: string,
  ): Promise<BeziehungMitPayloadsQuery | null> {
    return await this.beziehungenService.beziehung(id);
  }

  @Post()
  async erstelleBeziehung(
    @Body()
    input: BeziehungErstellenDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.beziehungenService.erstelleBeziehung(input);
  }

  @Patch('/:id')
  async aendereBeziehung(
    @Param('id')
    id: string,
    @Body()
    input: BeziehungErstellenDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.beziehungenService.aendereBeziehung(id, input);
  }

  @Delete('/:id')
  async loescheBeziehung(
    @Param('id') id: string,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.beziehungenService.loescheBeziehung(id);
  }
}
