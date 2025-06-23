import { Adressen } from '@/generated/prisma';
import { Controller, Post, Body } from '@nestjs/common';
import { AdressenService } from './adressen.service';

@Controller('adressen')
export class AdressenController {
  constructor(private readonly adressenService: AdressenService) {}

  @Post()
  async erstelleAdresse(
    @Body()
    adressDaten: {
      strasse: string;
      hausnummer: string;
      postleitzahl: string;
      stadt: string;
      land: string;
    },
  ): Promise<Adressen> {
    return this.adressenService.erstelleAdresse(adressDaten);
  }
}
