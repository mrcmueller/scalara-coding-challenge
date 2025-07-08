import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Immobilie, Land } from '@/generated/prisma';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';
import { ImmobilieAendernDto } from './dto/immobilieAendern.dto';
import { ImmobilieMitBeziehungenQuery } from './immobilienTypes';

@Injectable()
export class ImmobilienService {
  constructor(private readonly prisma: PrismaService) {}

  istImmobilie(input: any): input is Immobilie {
    if (typeof input !== 'object' || input === null) return false;

    const sichererInput = input as Record<string, unknown>;

    const {
      id,
      name,
      beschreibung,
      strasse,
      hausnummer,
      postleitzahl,
      stadt,
      land,
    } = sichererInput;

    return (
      typeof id === 'string' &&
      typeof name === 'string' &&
      typeof beschreibung === 'string' &&
      typeof strasse === 'string' &&
      typeof hausnummer === 'string' &&
      typeof postleitzahl === 'string' &&
      typeof stadt === 'string' &&
      (land === Land.Deutschland ||
        land === Land.Frankreich ||
        land === Land.Italien)
    );
  }

  async immobilie(id: string): Promise<ImmobilieMitBeziehungenQuery | null> {
    const antwort = await this.prisma.immobilie.findUnique({
      where: { id },
      include: { beziehungen: true },
    });

    // if (antwort === null) {
    //   throw new NotFoundException('Immobilie nicht gefunden');
    // }

    return antwort;
  }

  async immobilien(): Promise<ImmobilieMitBeziehungenQuery[]> {
    return await this.prisma.immobilie.findMany({
      include: { beziehungen: true },
    });
  }

  async erstelleImmobilie(
    input: ImmobilieErstellenDto,
  ): Promise<ImmobilieMitBeziehungenQuery> {
    return await this.prisma.immobilie.create({
      data: input,
      include: { beziehungen: true },
    });
  }

  async aendereImmobilie(
    id: string,
    input: ImmobilieAendernDto,
  ): Promise<ImmobilieMitBeziehungenQuery> {
    return await this.prisma.immobilie.update({
      where: { id },
      data: input,
      include: { beziehungen: true },
    });
  }

  async loescheImmobilie(id: string): Promise<ImmobilieMitBeziehungenQuery> {
    return await this.prisma.immobilie.delete({
      where: { id },
      include: { beziehungen: true },
    });
  }
}
