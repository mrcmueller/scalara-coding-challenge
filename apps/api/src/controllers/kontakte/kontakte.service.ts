import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Kontakt } from '@/generated/prisma';
import { KontaktErstellenDto } from './dto/kontaktErstellen.dto';
import { KontaktMitBeziehungenQuery } from './kontakteTypes';
import { KontaktAendernDto } from './dto/kontaktAendern.dto';

@Injectable()
export class KontakteService {
  constructor(private readonly prisma: PrismaService) {}

  async kontakt(id: string): Promise<Kontakt | null> {
    return await this.prisma.kontakt.findUnique({
      where: { id },
      include: { beziehungen: true },
    });
  }

  async kontakte(): Promise<Kontakt[]> {
    return await this.prisma.kontakt.findMany({
      include: { beziehungen: true },
    });
  }

  async erstelleKontakt(
    input: KontaktErstellenDto,
  ): Promise<KontaktMitBeziehungenQuery> {
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
    const logger = new Logger();

    logger.log(`Tried to delete Kontakt with id: ${id}`);

    return await this.prisma.kontakt.delete({
      where: { id },
      include: { beziehungen: true },
    });
  }
}
