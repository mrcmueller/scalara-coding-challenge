import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Prisma, Immobilien } from '@/generated/prisma';
import { AdressenService } from '../adressen';
import { Immobilie } from './immobilienTypes';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';

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

  istImmobilie(input: any): input is Immobilie {
    if (typeof input !== 'object' || input === null) return false;

    const sichererInput = input as Record<string, unknown>;

    const {
      name = undefined,
      beschreibung = undefined,
      adresse = undefined,
    } = sichererInput;

    return (
      typeof name === 'string' &&
      typeof beschreibung === 'string' &&
      this.adressenService.istAdresse(adresse)
    );
  }

  async findeErsteVerifizierteAdressenId(
    input: any,
  ): Promise<string | null | undefined> {
    if (this.adressenService.istAdresse(input)) {
      const searchResult = await this.prisma.adressen.findFirst({
        where: input,
      });
      return searchResult?.id;
    }
    if (typeof input === 'string') {
      const searchResult = await this.prisma.adressen.findFirst({
        where: { id: input },
      });
      return searchResult?.id;
    }
  }

  async erstelleImmobilie(
    input: ImmobilieErstellenDto,
  ): Promise<Immobilien | undefined> {
    if (input?.adressenId) {
      // Wenn adressenId auf input
      if (
        await this.prisma.adressen.findFirst({
          where: { id: input.adressenId },
        })
      ) {
        // Wenn adressenId auf input und adressenId zudem validiert ist (tatsächlich eine Adresse referenziert)
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

    if (findeErsteAdresse) {
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

  async aendereImmobilie(params: {
    where: Prisma.ImmobilienWhereUniqueInput;
    data: Prisma.ImmobilienUpdateInput;
  }): Promise<Immobilien> {
    const { where, data } = params;
    return await this.prisma.immobilien.update({
      data,
      where,
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
