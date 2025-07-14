import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';
import { BeziehungAendernDto } from './dto/beziehungAendern.dto';
import { BeziehungMitPayloadsQuery } from './beziehungen.types';
import { MieterUeberschneidungService } from '../validatoren/mieterUeberschneidung/mieterUeberschneidung.service';
import { MieterUeberschneidungAnfrageDTO } from '../validatoren/mieterUeberschneidung/dto/mieterUeberschneidungAnfrage.dto';

type Potentials = {
  id?: string;
  beziehungstyp?: number;
  dienstleistungstyp?: number | null;
  startdatum?: Date;
  enddatum?: Date;
  immobilienId?: string;
};

const typeGuard = (input: any): input is MieterUeberschneidungAnfrageDTO => {
  return (
    typeof input === 'object' &&
    input !== null &&
    'immobilienId' in input &&
    'startdatum' in input &&
    'enddatum' in input
  );
};

@Injectable()
export class BeziehungenService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ueberschneidungsService: MieterUeberschneidungService,
  ) {}

  async checks(input: Potentials) {
    const { id } = input;

    // Lade fehlende Props

    if (id) {
      // id wird nur bei Änderungen mitgesendet
      // Falls eine Änderung stattfindet, lade die props der Beziehung, die im Body der Änderungsrequest
      // nicht mitgesendet wurden, aber dennoch für Überprüfung relevant sind
      const beziehung = await this.prisma.beziehung.findUniqueOrThrow({
        where: { id },
      });

      // Erstelle Props auf input falls nicht vorhanden

      input.immobilienId = input?.immobilienId ?? beziehung?.immobilienId;
      input.beziehungstyp = input?.beziehungstyp ?? beziehung?.beziehungstyp;
      input.startdatum = input?.startdatum ?? beziehung?.startdatum;
      input.enddatum = input?.enddatum ?? beziehung?.enddatum;
    }

    // wenn id nicht auf input, dann sind alle für Prüfung relevanten Props bereits so oder so
    // sicher durch andere voherigen Checks auf input

    const { beziehungstyp, dienstleistungstyp } = input;

    if (beziehungstyp === 3 && !dienstleistungstyp) {
      throw new BadRequestException(['Bitte gib eine Dienstleistung an']);
    }
    if (beziehungstyp === 2 && typeGuard(input)) {
      const ueberschneidung =
        await this.ueberschneidungsService.einenMieterProZeitraum(input);

      if (ueberschneidung)
        throw new BadRequestException([
          'Die Immobilie hat bereits eine Mietung für diesen Zeitraum',
        ]);
    }
  }

  async beziehungen(kontaktId?: string): Promise<BeziehungMitPayloadsQuery[]> {
    return await this.prisma.beziehung.findMany({
      where: { kontaktId: kontaktId ?? {} },
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
    await this.checks({ ...input, id });

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
