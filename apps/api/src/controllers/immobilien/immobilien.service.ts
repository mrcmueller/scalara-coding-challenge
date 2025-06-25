import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Immobilie, Prisma } from '@/generated/prisma';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';
import { ImmobilieAendernDto } from './dto/immobilieAendern.dto';

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
      typeof land === 'string'
    );
  }

  async immobilie(
    immobilienWhereUniqueInput: Prisma.ImmobilieWhereUniqueInput,
  ): Promise<Immobilie | null> {
    return await this.prisma.immobilie.findUnique({
      where: immobilienWhereUniqueInput,
    });
  }

  async immobilien(): Promise<Immobilie[]> {
    return await this.prisma.immobilie.findMany();
  }

  async erstelleImmobilie(input: ImmobilieErstellenDto): Promise<Immobilie> {
    return await this.prisma.immobilie.create({
      data: input,
      include: { beziehungen: true },
    });
  }

  async aendereImmobilie(
    id: string,
    input: ImmobilieAendernDto,
  ): Promise<Immobilie> {
    return await this.prisma.immobilie.update({
      where: { id },
      data: input,
      include: { beziehungen: true },
    });
  }

  async loescheImmobilie(id: string): Promise<Immobilie> {
    return await this.prisma.immobilie.delete({
      where: { id },
      include: { beziehungen: true },
    });
  }
}
