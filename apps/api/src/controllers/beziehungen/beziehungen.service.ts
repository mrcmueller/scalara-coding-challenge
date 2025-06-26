import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Beziehung } from '@/generated/prisma';
import { BeziehungErstellenDto } from './dto/beziehungErstellen.dto';

@Injectable()
export class BeziehungenService {
  constructor(private readonly prisma: PrismaService) {}

  async beziehungen(): Promise<Beziehung[]> {
    return await this.prisma.beziehung.findMany();
  }

  async beziehung(id: string): Promise<Beziehung | null> {
    return await this.prisma.beziehung.findUnique({ where: { id } });
  }

  sample = {
    immobilie: '64e8a2f1cbb9a26b3f3b7d21',
    kontakt: '63e8a2f1cbb9a266df3b7d92',
    beziehungstyp: 3,
    dienstleistungstyp: 2,
    startdatum: '2025-06-25',
    enddatum: '2025-07-10',
  };

  sample2 = {
    immobilie: '64e8a2f1cbb9a26b3f3b7d21',
    kontakt: '63e8a2f1cbb9a266df3b7d92',
    beziehungstyp: 3,
    dienstleistungstyp: 2,
    startdatum: new Date('2025-06-25'),
    enddatum: new Date('2025-07-10'),
  };

  async erstelleBeziehung(input: this.prisma.er): Promise<Beziehung> {
    return await this.prisma.beziehung.create({ data: input });
  }
}
