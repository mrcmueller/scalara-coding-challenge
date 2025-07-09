import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { KontaktAendernDto } from './dto/kontaktAendern.dto';
import { KontaktErstellenDto } from './dto/kontaktErstellen.dto';
import { KontakteService } from './kontakte.service';
import { KontaktAntwortMitBeziehungenDto } from './dto/responses/kontaktAntwortMitBeziehungen.dto';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BeziehungenEingefuegtDto } from '../immobilien/dto/beziehungenEingefuegt.dto';
import { plainToInstance } from 'class-transformer';

@Controller('kontakte')
export class KontakteController {
  constructor(private readonly kontakteService: KontakteService) {}

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(KontaktAntwortMitBeziehungenDto) },
    },
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Get()
  async kontakte(): Promise<KontaktAntwortMitBeziehungenDto[]> {
    const antwort = await this.kontakteService.kontakte();
    return plainToInstance(KontaktAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({
    type: KontaktAntwortMitBeziehungenDto,
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Get('/:id')
  async kontakt(
    @Param('id') id: string,
  ): Promise<KontaktAntwortMitBeziehungenDto> {
    const antwort = await this.kontakteService.kontakt(id);
    return plainToInstance(KontaktAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({
    type: KontaktAntwortMitBeziehungenDto,
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Post()
  async erstelleKontakte(
    @Body()
    input: KontaktErstellenDto,
  ): Promise<KontaktAntwortMitBeziehungenDto> {
    const antwort = await this.kontakteService.erstelleKontakt(input);
    return plainToInstance(KontaktAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({
    type: KontaktAntwortMitBeziehungenDto,
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Patch('/:id')
  async aendereKontakte(
    @Param('id') id: string,
    @Body()
    input: KontaktAendernDto,
  ): Promise<KontaktAntwortMitBeziehungenDto> {
    const antwort = await this.kontakteService.aendereKontakt(id, input);
    return plainToInstance(KontaktAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({
    type: KontaktAntwortMitBeziehungenDto,
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Delete('/:id')
  async loescheKontakte(
    @Param('id') id: string,
  ): Promise<KontaktAntwortMitBeziehungenDto> {
    const antwort = await this.kontakteService.loescheKontakt(id);
    return plainToInstance(KontaktAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }
}
