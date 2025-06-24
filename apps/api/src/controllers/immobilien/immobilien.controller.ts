import { Immobilien, Land, Prisma } from '@/generated/prisma';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ImmobilienService } from './immobilien.service';
import { AdressenService } from '../adressen/adressen.service';
import { Immobilie } from './immobilienTypes';
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';

@Controller('immobilien')
export class ImmobilienController {
  constructor(
    private readonly immobilienService: ImmobilienService,
    private readonly adressenService: AdressenService,
  ) {}

  @Get()
  async immobilien() {
    return await this.immobilienService.immobilien();
  }

  @Get('/:id')
  async immobilie(@Param('id') id: string) {
    return await this.immobilienService.immobilie({ id });
  }

  //   id       String @id @default(auto()) @map("_id") @db.ObjectId
  // slug     String @unique
  // name     String
  // beschreibung String
  // adresse String @db.ObjectId

  @Post()
  async erstelleImmobilie(
    @Body()
    clientInput: ImmobilieErstellenDto,
  ): Promise<Immobilien | undefined> {
    return await this.immobilienService.erstelleImmobilie(clientInput);
  }

  @Patch('/:id')
  async aendereImmobilie(
    @Param('id') id: string,
    @Body()
    body: Prisma.ImmobilienUpdateInput & {
      strasse?: string;
      hausnummer?: string;
      postleitzahl?: string;
      stadt?: string;
      land?: Land;
    },
  ) {
    const {
      name = undefined,
      beschreibung = undefined,
      strasse = undefined,
      hausnummer = undefined,
      postleitzahl = undefined,
      stadt = undefined,
      land = undefined,
    } = body;
    const updatedNichtAdressenTeil =
      await this.immobilienService.aendereImmobilie({
        where: { id },
        data: { name, beschreibung },
      });
    const updatedAdressenTeil = await this.adressenService.aendereAdresse({
      where: { id },
      data: { strasse, hausnummer, postleitzahl, stadt, land },
    });

    return { ...updatedNichtAdressenTeil, ...updatedAdressenTeil };
  }

  @Delete('/:id')
  async loescheImmobilie(@Param('id') id: string) {
    return await this.immobilienService.loescheImmobilie({ id });
  }
}
