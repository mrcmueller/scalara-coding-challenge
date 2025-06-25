import { Adressen, Prisma } from '@/generated/prisma';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdressenService } from './adressen.service';
import { AdresseErstellenDto } from './dto/adresseErstellen.dto';
import { AdresseAendernDto } from './dto/adresseAendern.dto';

@Controller('adressen')
export class AdressenController {
  constructor(private readonly adressenService: AdressenService) {}

  @Get()
  async adressen() {
    return await this.adressenService.adressen();
  }

  @Get('/:id')
  async adresse(@Param('id') id: string) {
    return await this.adressenService.adresse(id);
  }

  @Post()
  async erstelleAdresse(
    @Body()
    input: AdresseErstellenDto,
  ): Promise<Adressen | undefined> {
    return await this.adressenService.erstelleAdresse(input);
  }

  @Patch('/:id')
  async adresseUeberschreiben(
    @Param('id') id: string,
    @Body() input: AdresseAendernDto,
  ) {
    return await this.adressenService.adresseUeberschreiben(id, input);
  }

  @Delete('/:id')
  async loescheAdresse(@Param('id') id: string) {
    return await this.adressenService.loescheAdresse(id);
  }
}
