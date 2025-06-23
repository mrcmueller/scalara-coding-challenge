import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma.service';
import { Prisma, Immobilien } from '@/generated/prisma';

@Injectable()
export class ImmobilienService {
  private prisma: PrismaService;

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

  async erstelleImmobilie(
    data: Prisma.ImmobilienCreateInput,
  ): Promise<Immobilien> {
    return await this.prisma.immobilien.create({
      data,
    });
  }

  async updateImmobilie(params: {
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
