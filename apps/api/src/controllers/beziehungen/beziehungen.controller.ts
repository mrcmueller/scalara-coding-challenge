import { Controller, Get, Post } from '@nestjs/common';
import { BeziehungenService } from './beziehungen.service';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';
import { Beziehung } from '@/generated/prisma';

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
  async beziehungErstellen(input: BeziehungErstellenDto): Promise<Beziehung> {
    return await this.beziehungenService.erstelleBeziehung(input);
  }
}
