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
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import { BeziehungAntwortDto } from './dto/responses/beziehungAntwort.dto';
import { KontaktAntwortDto } from '../kontakte/dto/responses/kontaktAntwort.dto';
import { ImmobilieAntwortDto } from '../immobilien/dto/responses/immobilieAntwort.dto';
import { plainToInstance } from 'class-transformer';

@Controller('beziehungen')
export class BeziehungenController {
  constructor(private readonly beziehungenService: BeziehungenService) {}

  @ApiOkResponse({ type: () => [BeziehungAntwortDto] })
  @ApiExtraModels(BeziehungAntwortDto, KontaktAntwortDto, ImmobilieAntwortDto)
  @Get()
  async beziehungen(): Promise<BeziehungAntwortDto[]> {
    const antwort = await this.beziehungenService.beziehungen();
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: BeziehungAntwortDto })
  @ApiExtraModels(BeziehungAntwortDto, KontaktAntwortDto, ImmobilieAntwortDto)
  @Get()
  async beziehung(
    @Param('id')
    id: string,
  ): Promise<BeziehungAntwortDto> {
    const antwort = await this.beziehungenService.beziehung(id);
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
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
    input: BeziehungAendernDto,
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
