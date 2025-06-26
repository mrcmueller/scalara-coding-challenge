import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto copy';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';

@Injectable()
export class BeziehungenService {
  constructor(private readonly prisma: PrismaService) {}

  async beziehungen(): Promise<BeziehungMitPayloadsQuery[]> {
    return await this.prisma.beziehung.findMany({
      include: { kontakt: true, immobilie: true },
    });
  }

  async beziehung(id: string): Promise<BeziehungMitPayloadsQuery | null> {
    return await this.prisma.beziehung.findUnique({
      where: { id },
      include: { kontakt: true, immobilie: true },
    });
  }

  async erstelleBeziehung(
    input: BeziehungErstellenDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.create({
      data: input,
      include: { kontakt: true, immobilie: true },
    });
  }

  async aendereBeziehung(
    id: string,
    input: BeziehungAendernDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.update({
      where: { id },
      data: input,
      include: { kontakt: true, immobilie: true },
    });
  }

  async loescheBeziehung(id: string): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.delete({
      where: { id },
      include: { kontakt: true, immobilie: true },
    });
  }
}
