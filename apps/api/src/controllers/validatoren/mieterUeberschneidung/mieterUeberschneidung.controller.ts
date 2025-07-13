import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { MieterUeberschneidungAntwortDTO } from './dto/mieterUeberschneidungAntwort.dto';

@Controller('beziehungen')
export class MieterUeberschneidungController {
  constructor(private readonly service: MieterUeberschneidungService) {}

  @ApiOkResponse({ type: MieterUeberschneidungAntwortDTO })
  @Get()
  async beziehungen(): Promise<MieterUeberschneidungAntwortDTO> {
    const antwort = await this.service.mieterUeberschneidung();
    return plainToInstance(MieterUeberschneidungAntwortDTO, antwort, {
      enableImplicitConversion: true,
    });
  }
}
