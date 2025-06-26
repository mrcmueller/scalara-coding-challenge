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
import { ImmobilieErstellenDto } from './dto/immobilieErstellen.dto';
import { ImmobilieAendernDto } from './dto/immobilieAendern.dto';

@Controller('immobilien')
export class ImmobilienController {
  constructor(private readonly immobilienService: ImmobilienService) {}

  @Get()
  async immobilien() {
    return await this.immobilienService.immobilien();
  }

  @Get('/:id')
  async immobilie(@Param('id') id: string) {
    return await this.immobilienService.immobilie(id);
  }

  @Post()
  async erstelleImmobilie(
    @Body()
    input: ImmobilieErstellenDto,
  ) {
    return await this.immobilienService.erstelleImmobilie(input);
  }

  @Patch('/:id')
  async aendereImmobilie(
    @Param('id') id: string,
    @Body()
    input: ImmobilieAendernDto,
  ) {
    return await this.immobilienService.aendereImmobilie(id, input);
  }

  @Delete('/:id')
  async loescheImmobilie(@Param('id') id: string) {
    return await this.immobilienService.loescheImmobilie(id);
  }
}
