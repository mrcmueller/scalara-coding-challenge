import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Adressen } from '@/generated/prisma';
import { AdresseErstellenDto } from './dto/adresseErstellen.dto';
import { AdresseAendernDto } from './dto/adresseAendern.dto';
import { landCheck } from './adressenTypes';

@Injectable()
export class AdressenService {
  constructor(private readonly prisma: PrismaService) {}

  istAdresse(input: any): input is AdresseErstellenDto {
    if (typeof input !== 'object' || input === null) return false;

    const { strasse, hausnummer, postleitzahl, stadt, land } = input;

    return (
      typeof strasse === 'string' &&
      typeof hausnummer === 'string' &&
      typeof postleitzahl === 'number' &&
      typeof stadt === 'string' &&
      landCheck(land)
    );
  }

  async adresse(id: string): Promise<Adressen | null> {
    return await this.prisma.adressen.findUnique({
      where: { id },
    });
  }

  async adressen(): Promise<Adressen[]> {
    return await this.prisma.adressen.findMany();
  }

  async erstelleAdresse(input: AdresseErstellenDto): Promise<Adressen> {
    const existingEntry = await this.prisma.adressen.findFirst({
      where: input,
    });

    if (existingEntry !== null) {
      return existingEntry;
    }
    return await this.prisma.adressen.create({
      data: input,
    });
  }

  async adresseUeberschreiben(
    id: string,
    input: AdresseAendernDto,
  ): Promise<Adressen> {
    return await this.prisma.adressen.update({ where: { id }, data: input });
  }

  async sicheresAdresseUpdate(
    entitaetId: string,
    input: AdresseAendernDto,
  ): Promise<Adressen> {
    const adresse = await this.prisma.adressen.findUniqueOrThrow({
      where: { id },
      include: { Immobilien: true, Kontakte: true },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const anzahlSelbeAdresse =
      adresse.Immobilien.length + adresse.Kontakte.length;

    if (anzahlSelbeAdresse <= 1) {
      // Keiner außer einer Entität (wahrscheinlich mir) nutzt Adresse, daher einfach Änderungen direkt anwenden
      return await this.adresseUeberschreiben(id, input);
    }

    // Mehr als eine Entität nutzt Adresse

    return await this.erstelleAdresse({});
  }

  async loescheAdresse(id: string): Promise<Adressen> {
    return await this.prisma.adressen.delete({
      where: { id },
    });
  }
}
