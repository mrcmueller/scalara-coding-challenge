import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { KontaktAendernDto } from './dto/kontaktAendern.dto';
import { KontaktErstellenDto } from './dto/kontaktErstellen.dto';
import { KontakteService } from './kontakte.service';

@Controller('kontakte')
export class KontakteController {
  constructor(private readonly kontakteService: KontakteService) {}

  @Get()
  async kontakte() {
    return await this.kontakteService.kontakte();
  }

  @Get('/:id')
  async kontakt(@Param('id') id: string) {
    return await this.kontakteService.kontakt(id);
  }

  @Post()
  async erstelleKontakte(
    @Body()
    input: KontaktErstellenDto,
  ) {
    return await this.kontakteService.erstelleKontakt(input);
  }

  @Patch('/:id')
  async aendereKontakte(
    @Param('id') id: string,
    @Body()
    input: KontaktAendernDto,
  ) {
    return await this.kontakteService.aendereKontakt(id, input);
  }

  @Delete('/:id')
  async loescheKontakte(@Param('id') id: string) {
    return await this.kontakteService.loescheKontakt(id);
  }
}
