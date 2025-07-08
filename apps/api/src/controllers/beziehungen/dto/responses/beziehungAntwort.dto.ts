import { ImmobilieAntwortDto } from '@/src/controllers/immobilien/dto/responses/immobilienAntwort.dto';
import { KontaktAntwortDto } from '@/src/controllers/kontakte/dto/responses/kontaktAntwort.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';

export class BeziehungAntwortDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => KontaktAntwortDto })
  kontakt: KontaktAntwortDto;

  @ApiProperty({ type: () => ImmobilieAntwortDto })
  immobilie: ImmobilieAntwortDto;

  @ApiProperty()
  @IsInt()
  beziehungstyp: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  dienstleistungstyp?: number;

  @ApiProperty()
  @IsDateString()
  startdatum: string;

  @ApiProperty()
  @IsDateString()
  enddatum: string;
}
