import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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

  test(input: BeziehungErstellenDto): string {
    console.log(input);
    return 'hello';
  }

  @Post()
  async erstelleBeziehung(input: BeziehungErstellenDto): Promise<Beziehung> {
    return await this.beziehungenService.erstelleBeziehung(input);
  }

  @Patch()
  async aendereBeziehung(
    id: string,
    input: BeziehungErstellenDto,
  ): Promise<Beziehung> {
    return await this.beziehungenService.aendereBeziehung(id, input);
  }

  @Delete()
  async loescheBeziehung(id: string): Promise<Beziehung> {
    return await this.beziehungenService.loescheBeziehung(id);
  }
}
