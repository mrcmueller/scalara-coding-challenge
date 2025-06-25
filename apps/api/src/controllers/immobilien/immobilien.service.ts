import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Prisma, Immobilien } from '@/generated/prisma';
import { AdressenService } from '../adressen';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';
import { ImmobilieAendernDto } from './dto/immobilieAendern.dto';

@Injectable()
export class ImmobilienService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adressenService: AdressenService,
  ) {}

  async immobilie(
    immobilienWhereUniqueInput: Prisma.ImmobilienWhereUniqueInput,
  ): Promise<Immobilien | null> {
    return await this.prisma.immobilien.findUnique({
      where: immobilienWhereUniqueInput,
    });
  }

  async immobilien(): Promise<Immobilien[]> {
    return await this.prisma.immobilien.findMany();
  }

  istImmobilie(input: any): input is Immobilien {
    if (typeof input !== 'object' || input === null) return false;

    const sichererInput = input as Record<string, unknown>;

    const {
      id = undefined,
      name = undefined,
      beschreibung = undefined,
      adressenId = undefined,
    } = sichererInput;

    return (
      typeof id === 'string' &&
      typeof name === 'string' &&
      typeof beschreibung === 'string' &&
      typeof adressenId === 'string'
    );
  }

  async erstelleImmobilie(input: ImmobilieErstellenDto): Promise<Immobilien> {
    if (input?.adressenId) {
      if (
        (await this.prisma.adressen.findUnique({
          where: { id: input.adressenId },
        })) !== null
      ) {
        return await this.prisma.immobilien.create({
          data: {
            name: input.name,
            beschreibung: input.beschreibung,
            adresse: {
              connect: {
                id: input.adressenId,
              },
            },
          },
        });
      }

      // Wenn adressenId auf input, aber nicht gültig
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description: 'Ungültige AdressenId',
      });
    }

    const findeErsteAdresse = await this.prisma.adressen.findFirst({
      where: input.adresse,
    });

    if (findeErsteAdresse !== null) {
      // Wenn die mitgesendete Adresse bereits existiert
      return await this.prisma.immobilien.create({
        data: {
          name: input.name,
          beschreibung: input.beschreibung,
          adresse: {
            connect: {
              id: findeErsteAdresse.id,
            },
          },
        },
      });
    }

    // Wenn Adresse mitgesendet wurde, allerdings noch nicht existiert
    return await this.prisma.immobilien.create({
      data: {
        name: input.name,
        beschreibung: input.beschreibung,
        adresse: {
          create: input.adresse,
        },
      },
    });
  }

  async aendereImmobilie(
    id: string,
    input: ImmobilieAendernDto,
  ): Promise<Immobilien | null | undefined> {
    if (input?.adresse && input?.adressenId) {
      throw new BadRequestException('Bad request', {
        cause: new Error(),
        description:
          'Input sollte nicht adresse und adressenId gleichzeitig enthalten',
      });
    }

    const { adresse, ...inputWithoutAdresse } = input;

    if (adresse) {
      const immobilie = await this.prisma.immobilien.findUnique({
        where: { id },
      });

      if (immobilie) {
        const adresse = await this.prisma.adressen.findUnique({
          where: { id: immobilie.adressenId as string },
          include: { Immobilien: true, Kontakte: true },
        });

        if (adresse) {
          const anzahlSelbeAdresse =
            adresse.Immobilien.length + adresse.Kontakte.length;
        }

        await this.adressenService.adresseUeberschreiben(
          immobilie.adressenId as string,
          adresse,
        );
      } else {
        throw new BadRequestException('Bad request', {
          cause: new Error(),
          description: 'Immobilie via id nicht gefunden',
        });
      }
    }

    // Einfach adressenId updaten und die anderen Properties

    return await this.prisma.immobilien.update({
      where: { id },
      data: inputWithoutAdresse,
    });
  }

  async loescheImmobilie(
    where: Prisma.ImmobilienWhereUniqueInput,
  ): Promise<Immobilien> {
    return await this.prisma.immobilien.delete({
      where,
    });
  }
}
