import { Body, Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MieterUeberschneidungAntwortDTO } from './dto/mieterUeberschneidungAntwort.dto';
import { MieterUeberschneidungAnfrageDTO } from './dto/mieterUeberschneidungAnfrage.dto';
import { MieterUeberschneidungService } from './mieterUeberschneidung.service';

@Controller('validatoren/mieterueberschneidung')
export class MieterUeberschneidungController {
  constructor(private readonly service: MieterUeberschneidungService) {}

  @ApiOkResponse({ type: MieterUeberschneidungAntwortDTO })
  @Get()
  async beziehungen(
    @Body()
    input: MieterUeberschneidungAnfrageDTO,
  ): Promise<MieterUeberschneidungAntwortDTO> {
    const antwort = await this.service.mieterUeberschneidung(input);
    return plainToInstance(MieterUeberschneidungAntwortDTO, antwort, {
      enableImplicitConversion: true,
    });
  }
}
