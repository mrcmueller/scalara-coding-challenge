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

  async erstelleBeziehung(input: BeziehungErstellenDto): Promise<Beziehung> {
    console.log(input);
    return await this.prisma.beziehung.create({ data: input });
  }
}
