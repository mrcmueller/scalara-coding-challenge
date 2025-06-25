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
    input: ImmobilieAendernDto,
  ) {
    return this.immobilienService.aendereImmobilie(id, input);
  }

  @Delete('/:id')
  async loescheImmobilie(@Param('id') id: string) {
    return await this.immobilienService.loescheImmobilie({ id });
  }
}
