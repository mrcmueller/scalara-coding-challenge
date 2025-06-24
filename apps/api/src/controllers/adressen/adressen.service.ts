import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Prisma, Adressen } from '@/generated/prisma';
import { Adresse } from './adressenTypes';
import { AdresseErstellenDto } from './dto/adresseErstellen.dto';
import { AdresseAendernDto } from './dto/adresseAendern.dto';

@Injectable()
export class AdressenService {
  constructor(private readonly prisma: PrismaService) {}

  istAdresse(input: any): input is Adresse {
    if (typeof input !== 'object' || input === null) return false;

    const sichererInput = input as Record<string, unknown>;

    const {
      strasse = undefined,
      hausnummer = undefined,
      postleitzahl = undefined,
      stadt = undefined,
      land = undefined,
    } = sichererInput;

    return (
      typeof strasse === 'string' &&
      typeof hausnummer === 'string' &&
      typeof postleitzahl === 'number' &&
      typeof stadt === 'string' &&
      (land === 'Deutschland' ||
        land === 'Italien' ||
        land === 'Österreich' ||
        land === 'Frankreich')
    );
  }

  async adresse(
    input: Prisma.AdressenWhereUniqueInput,
  ): Promise<Adressen | null> {
    return await this.prisma.adressen.findUnique({
      where: input,
    });
  }

  async adressen(): Promise<Adressen[]> {
    return await this.prisma.adressen.findMany();
  }

  async erstelleAdresse(
    input: AdresseErstellenDto,
  ): Promise<Adressen | undefined> {
    const existingEntry = await this.prisma.adressen.findFirst({
      where: input,
    });

    if (existingEntry) {
      return existingEntry;
    }
    return await this.prisma.adressen.create({
      data: input,
    });
  }

  async aendereAdresse(input: {
    where: Prisma.AdressenWhereUniqueInput;
    data: AdresseAendernDto;
  }): Promise<Adressen> {
    return await this.prisma.adressen.update(input);
  }

  async loescheAdresse(
    where: Prisma.AdressenWhereUniqueInput,
  ): Promise<Adressen> {
    return await this.prisma.adressen.delete({
      where,
    });
  }
}
