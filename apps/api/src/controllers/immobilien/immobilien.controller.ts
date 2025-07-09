import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ImmobilienService } from './immobilien.service';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';
import { ImmobilieAendernDto } from './dto/immobilieAendern.dto';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ImmobilieAntwortMitBeziehungenDto } from './dto/responses/immobilieAntwortMitBeziehungen.dto';
import { plainToInstance } from 'class-transformer';
import { BeziehungenEingefuegtDto } from './dto/beziehungenEingefuegt.dto';

@Controller('immobilien')
export class ImmobilienController {
  constructor(private readonly immobilienService: ImmobilienService) {}

  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { $ref: getSchemaPath(ImmobilieAntwortMitBeziehungenDto) },
    },
  })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Get()
  async immobilien(): Promise<ImmobilieAntwortMitBeziehungenDto[]> {
    const antwort = await this.immobilienService.immobilien();
    return plainToInstance(ImmobilieAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: ImmobilieAntwortMitBeziehungenDto })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Get('/:id')
  async immobilie(
    @Param('id') id: string,
  ): Promise<ImmobilieAntwortMitBeziehungenDto | null> {
    const antwort = await this.immobilienService.immobilie(id);
    return plainToInstance(ImmobilieAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: ImmobilieAntwortMitBeziehungenDto })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Post()
  async erstelleImmobilie(
    @Body()
    input: ImmobilieErstellenDto,
  ): Promise<ImmobilieAntwortMitBeziehungenDto> {
    const antwort = await this.immobilienService.erstelleImmobilie(input);
    return plainToInstance(ImmobilieAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  @ApiOkResponse({ type: ImmobilieAntwortMitBeziehungenDto })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Patch('/:id')
  async aendereImmobilie(
    @Param('id') id: string,
    @Body()
    input: ImmobilieAendernDto,
  ): Promise<ImmobilieAntwortMitBeziehungenDto> {
    const antwort = await this.immobilienService.aendereImmobilie(id, input);
    return plainToInstance(ImmobilieAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  @ApiOkResponse({ type: ImmobilieAntwortMitBeziehungenDto })
  @ApiExtraModels(BeziehungenEingefuegtDto)
  @Delete('/:id')
  async loescheImmobilie(
    @Param('id') id: string,
  ): Promise<ImmobilieAntwortMitBeziehungenDto> {
    const antwort = await this.immobilienService.loescheImmobilie(id);
    return plainToInstance(ImmobilieAntwortMitBeziehungenDto, antwort, {
      enableImplicitConversion: true,
    });
  }
}
