import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Prisma, Adressen } from '@/generated/prisma';

@Injectable()
export class AdressenService {
  constructor(private readonly prisma: PrismaService) {}

  async adresse(
    AdressenWhereUniqueInput: Prisma.AdressenWhereUniqueInput,
  ): Promise<Adressen | null> {
    return await this.prisma.adressen.findUnique({
      where: AdressenWhereUniqueInput,
    });
  }

  async adressen(): Promise<Adressen[]> {
    return await this.prisma.adressen.findMany();
  }

  async erstelleAdresse(data: Prisma.AdressenCreateInput): Promise<Adressen> {
    return await this.prisma.adressen.create({
      data,
    });
  }

  async updateAdresse(params: {
    where: Prisma.AdressenWhereUniqueInput;
    data: Prisma.AdressenUpdateInput;
  }): Promise<Adressen> {
    const { where, data } = params;
    return await this.prisma.adressen.update({
      data,
      where,
    });
  }

  async loescheAdresse(
    where: Prisma.AdressenWhereUniqueInput,
  ): Promise<Adressen> {
    return await this.prisma.adressen.delete({
      where,
    });
  }
}
