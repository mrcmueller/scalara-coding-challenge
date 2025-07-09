import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';

const istZeitraumUeberlappend = (
  startdatumA: Date,
  enddatumA: Date,
  startdatumB: Date,
  enddatumB: Date,
) => {
  const startA = startdatumA.setHours(0, 0, 0, 0);
  const endA = enddatumA.setHours(0, 0, 0, 0);
  const startB = startdatumB.setHours(0, 0, 0, 0);
  const endB = enddatumB.setHours(0, 0, 0, 0);

  const startAueberlappungB = startA >= startB && startA <= endB;
  const endAueberlappungB = endA >= startB && endA <= endB;

  return startAueberlappungB && endAueberlappungB;
};

type Potentials = {
  beziehungstyp?: number;
  dienstleistungstyp?: number | null;
  startdatum?: Date;
  enddatum?: Date;
  immobilienId?: string;
};

type Ueberpruefbar = {
  beziehungstyp: number;
  dienstleistungstyp: number;
  startdatum: Date;
  enddatum: Date;
  immobilienId: string;
};

@Injectable()
export class BeziehungenService {
  private readonly logger = new Logger(BeziehungenService.name);

  constructor(private readonly prisma: PrismaService) {}

  async einenMieterProZeitraum(
    input: {
      startdatum: Date;
      enddatum: Date;
      immobilienId: string;
    },
    id?: string,
  ) {
    // Pro Immobilie nur einen Mieter pro Zeitraum
    let ueberschneidungGefunden = false;

    const alleMieterImmobilie = await this.prisma.beziehung.findMany({
      where: { immobilienId: input.immobilienId, beziehungstyp: 2 },
    });

    if (id) {
      const indexToRemove = alleMieterImmobilie.findIndex((el) => el.id === id);
      alleMieterImmobilie.splice(indexToRemove, 1);
    }

    for (let i = 0; i < alleMieterImmobilie.length; i += 1) {
      const el = alleMieterImmobilie[i];
      if (
        istZeitraumUeberlappend(
          el.startdatum,
          el.enddatum,
          input.startdatum,
          input.enddatum,
        )
      ) {
        ueberschneidungGefunden = true;
        break;
      }
    }

    if (ueberschneidungGefunden) {
      throw new BadRequestException([
        'Die Immobilie hat bereits einen Mieter an diesem Zeitraum',
      ]);
    }
  }

  async checks(input: Potentials, id?: string) {
    let loaded;
    let merged;

    if (id) {
      // Da fast alle props für Validations benötigt werden -> fetch wenn Änderung
      loaded = await this.prisma.beziehung.findUniqueOrThrow({
        where: { id },
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      merged = Object.assign({}, loaded, input);

      if (
        (merged as Potentials)?.beziehungstyp === 3 &&
        !(merged as Potentials).dienstleistungstyp
      ) {
        throw new BadRequestException(['Bitte gib eine Dienstleistung an']);
      }

      if ((merged as Ueberpruefbar).beziehungstyp === 2) {
        await this.einenMieterProZeitraum(merged as Ueberpruefbar, id);
      }
    } else if (input?.beziehungstyp === 3 && !input?.dienstleistungstyp) {
      throw new BadRequestException(['Bitte gib eine Dienstleistung an']);
    } else if (input?.beziehungstyp === 2) {
      await this.einenMieterProZeitraum(input as Ueberpruefbar);
    }

    // Pro Immobilie nur einen Mieter pro Zeitraum
  }

  async beziehungen(): Promise<BeziehungMitPayloadsQuery[]> {
    this.logger.log('Hello');

    return await this.prisma.beziehung.findMany({
      include: { immobilie: true, kontakt: true },
    });
  }

  async beziehung(id: string): Promise<BeziehungMitPayloadsQuery | null> {
    const antwort = await this.prisma.beziehung.findUnique({
      where: { id },
      include: { immobilie: true, kontakt: true },
    });

    return antwort;
  }

  async erstelleBeziehung(
    input: BeziehungErstellenDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    await this.checks(input);

    return await this.prisma.beziehung.create({
      data: input,
      include: { immobilie: true, kontakt: true },
    });
  }

  async aendereBeziehung(
    id: string,
    input: BeziehungAendernDto,
  ): Promise<BeziehungMitPayloadsQuery> {
    await this.checks({ ...input }, id);

    const result = await this.prisma.beziehung.update({
      where: { id },
      data: input,
      include: { immobilie: true, kontakt: true },
    });
    return result;
  }

  async loescheBeziehung(id: string): Promise<BeziehungMitPayloadsQuery> {
    return await this.prisma.beziehung.delete({
      where: { id },
      include: { immobilie: true, kontakt: true },
    });
  }
}
