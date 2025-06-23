import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ImmobilienService } from './immobilien.service';
import { Immobilien } from '@/generated/prisma';

type prop = Promise<
  {
    id: string;
    email: string;
    name: string | null;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    } | null;
  }[]
>;

@Controller('immobilien')
export class ImmobilienController {
  private readonly immobilienService: ImmobilienService;

  //   @Post()
  //   async erstelleImmobilie(
  //     @Body()
  //     immobilienDaten: {
  //       land: string | null;
  //       slug: string;
  //       name: string;
  //       beschreibung: string;
  //       strasse: string;
  //       hausnummer: string;
  //       postleitzahl: string;
  //       stadt: string;
  //     },
  //   ): Promise<Immobilien> {

  //     return this.immobilienService.erstelleImmobilie(immobilienDaten);
  //   }
}
