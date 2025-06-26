import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Kontakt } from '@/generated/prisma';
import { KontaktErstellenDto } from './dto/kontaktErstellen.dto';
import { KontaktAendernDto } from './dto/kontaktAendern.dto';
import { KontaktMitBeziehungenQuery } from './kontaktnTypes';

@Injectable()
export class KontakteService {
  constructor(private readonly prisma: PrismaService) {}

  async kontakte(id: string): Promise<Kontakt | null> {
    return await this.prisma.kontakt.findUnique({
      where: { id },
      include: { beziehungen: true },
    });
  }

  async kontaktn(): Promise<Kontakt[]> {
    return await this.prisma.kontakt.findMany({
      include: { beziehungen: true },
    });
  }

  async erstelleKontakt(
    input: KontaktErstellenDto,
  ): Promise<KontaktMitBeziehungenQuery[]> {
    return await this.prisma.kontakt.create({
      data: input,
      include: { beziehungen: true },
    });
  }

  async aendereKontakt(
    id: string,
    input: KontaktAendernDto,
  ): Promise<KontaktMitBeziehungenQuery> {
    return await this.prisma.kontakt.update({
      where: { id },
      data: input,
      include: { beziehungen: true },
    });
  }

  async loescheKontakt(id: string): Promise<KontaktMitBeziehungenQuery> {
    return await this.prisma.kontakt.delete({
      where: { id },
      include: { beziehungen: true },
    });
  }
}
