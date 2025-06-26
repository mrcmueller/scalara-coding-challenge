import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Beziehung } from '@/generated/prisma';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto copy';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';

@Injectable()
export class BeziehungenService {
  constructor(private readonly prisma: PrismaService) {}

  async beziehungen(): Promise<Beziehung[]> {
    return await this.prisma.beziehung.findMany();
  }

  async beziehung(id: string): Promise<Beziehung | null> {
    return await this.prisma.beziehung.findUnique({ where: { id } });
  }

  async erstelleBeziehung(input: BeziehungErstellenDto): Promise<Beziehung> {
    return await this.prisma.beziehung.create({ data: input });
  }

  async aendereBeziehung(
    id: string,
    input: BeziehungAendernDto,
  ): Promise<Beziehung> {
    return await this.prisma.beziehung.update({ where: { id }, data: input });
  }

  async loescheBeziehung(id: string): Promise<Beziehung> {
    return await this.prisma.beziehung.delete({ where: { id } });
  }
}
