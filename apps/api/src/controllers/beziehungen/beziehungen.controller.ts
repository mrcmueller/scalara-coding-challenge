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
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BeziehungAntwortDto } from './dto/responses/beziehungAntwort.dto';
import { KontaktAntwortDto } from '../kontakte/dto/responses/kontaktAntwort.dto';
import { ImmobilieAntwortDto } from '../immobilien/dto/responses/immobilieAntwort.dto';
import { plainToInstance } from 'class-transformer';

@Controller('beziehungen')
export class BeziehungenController {
  constructor(private readonly beziehungenService: BeziehungenService) {}

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(BeziehungAntwortDto) },
    },
  })
  @ApiExtraModels(KontaktAntwortDto, ImmobilieAntwortDto)
  @Get()
  async beziehungen(): Promise<BeziehungAntwortDto[]> {
    const antwort = await this.beziehungenService.beziehungen();
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: BeziehungAntwortDto })
  @ApiExtraModels(KontaktAntwortDto, ImmobilieAntwortDto)
  @Get('/:id')
  async beziehung(
    @Param('id')
    id: string,
  ): Promise<BeziehungAntwortDto> {
    const antwort = await this.beziehungenService.beziehung(id);
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: BeziehungAntwortDto })
  @ApiExtraModels(KontaktAntwortDto, ImmobilieAntwortDto)
  @Post()
  async erstelleBeziehung(
    @Body()
    input: BeziehungErstellenDto,
  ): Promise<BeziehungAntwortDto> {
    const antwort = await this.beziehungenService.erstelleBeziehung(input);
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: BeziehungAntwortDto })
  @ApiExtraModels(KontaktAntwortDto, ImmobilieAntwortDto)
  @Patch('/:id')
  async aendereBeziehung(
    @Param('id')
    id: string,
    @Body()
    input: BeziehungAendernDto,
  ): Promise<BeziehungAntwortDto> {
    const antwort = await this.beziehungenService.aendereBeziehung(id, input);
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: BeziehungAntwortDto })
  @ApiExtraModels(KontaktAntwortDto, ImmobilieAntwortDto)
  @Delete('/:id')
  async loescheBeziehung(
    @Param('id') id: string,
  ): Promise<BeziehungAntwortDto> {
    const antwort = await this.beziehungenService.loescheBeziehung(id);
    return plainToInstance(BeziehungAntwortDto, antwort, {
      enableImplicitConversion: true,
    });
  }
}
