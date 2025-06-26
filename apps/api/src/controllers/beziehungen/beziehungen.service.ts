import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';

@Injectable()
export class BeziehungenService {
  constructor(private readonly prisma: PrismaService) {}

  async beziehungen(): Promise<BeziehungMitPayloadsQuery[]> {
    return await this.prisma.beziehung.findMany({
      include: { immobilie: true, kontakt: true },
    });
  }

  async beziehung(id: string): Promise<BeziehungMitPayloadsQuery | null> {
    return await this.prisma.beziehung.findUnique({
      where: { id },
      include: { immobilie: true, kontakt: true },
    });
  }

  async erstelleBeziehung(
    input: BeziehungErstellenDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    // Validiere gegen einen Zeitraum, wo Startdatum vor Enddatum liegt
    // Verhindere, dass eine Beziehung mit den selben Entitäten für einen überschneidenden Zeitraum erstellt wird

    return await this.prisma.beziehung.create({
      data: input,
      include: { immobilie: true, kontakt: true },
    });
  }

  async aendereBeziehung(
    id: string,
    input: BeziehungAendernDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.update({
      where: { id },
      data: input,
      include: { immobilie: true, kontakt: true },
    });
  }

  async loescheBeziehung(id: string): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.delete({
      where: { id },
      include: { immobilie: true, kontakt: true },
    });
  }
}
