import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { MieterUeberschneidungAnfrageDTO } from './dto/mieterUeberschneidungAnfrage.dto';
import { MieterUeberschneidungAntwortDTO } from './dto/mieterUeberschneidungAntwort.dto';

const istZeitraumUeberlappend = (
  startdatumA: Date,
  enddatumA: Date,
  startdatumB: Date,
  enddatumB: Date,
) => {
  // durch voherige Checks wissen wir bereits, dass das Enddatum nicht vor dem Startdatum liegt

  const zeitraumA = {
    start: startdatumA.getTime(),
    ende: enddatumA.getTime(),
  };

  const zeitraumB = {
    start: startdatumB.getTime(),
    ende: enddatumB.getTime(),
  };

  const laengeZeitraumA = zeitraumA.ende - zeitraumA.start;
  const laengeZeitraumB = zeitraumB.ende - zeitraumB.start;

  return !(
    Math.max(zeitraumA.ende, zeitraumB.ende) -
      Math.min(zeitraumA.start, zeitraumB.start) >
    laengeZeitraumA + laengeZeitraumB
  );
};

@Injectable()
export class MieterUeberschneidungService {
  constructor(private readonly prisma: PrismaService) {}

  async einenMieterProZeitraum(input: {
    id?: string;
    immobilienId: string;
    startdatum: Date;
    enddatum: Date;
  }) {
    // Pro Immobilie nur einen Mieter pro Zeitraum

    const { immobilienId, startdatum, enddatum, id } = input;

    const relevanteMietungenImmobilie = await this.prisma.beziehung.findMany({
      where: {
        immobilienId,
        beziehungstyp: 2,
        id: id ? { not: id } : {},
      },
      // Der not filter sorgt dafür, dass die zu ändernde Mietbeziehung für die Überschneidungsüberprüfung
      // ignoriert wird
      // Die id wird nämlich nur bei Änderungen mitgesendet
    });

    // Wenn keine für Überschneidungen relevante Mietungen existieren, dann gibt es auch keine Überschneidung

    if (!relevanteMietungenImmobilie.length) {
      return false;
    }

    const ersteUeberschneidung = relevanteMietungenImmobilie.find((el) =>
      istZeitraumUeberlappend(el.startdatum, el.enddatum, startdatum, enddatum),
    );

    return Boolean(ersteUeberschneidung);
  }

  async mieterUeberschneidung(
    input: MieterUeberschneidungAnfrageDTO,
  ): Promise<MieterUeberschneidungAntwortDTO> {
    const result = await this.einenMieterProZeitraum(input);

    return { ueberschneidung: result };
  }
}
