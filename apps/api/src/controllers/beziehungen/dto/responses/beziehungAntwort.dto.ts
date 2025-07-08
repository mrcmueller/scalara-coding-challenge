/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ImmobilieAntwortDto } from '../../../immobilien/dto/responses/immobilieAntwort.dto';
import { KontaktAntwortDto } from '../../../kontakte/dto/responses/kontaktAntwort.dto';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BeziehungAntwortDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: () => KontaktAntwortDto })
  kontakt: KontaktAntwortDto;

  @ApiProperty({ type: () => ImmobilieAntwortDto })
  immobilie: ImmobilieAntwortDto;

  @ApiProperty()
  @IsNumber()
  @IsIn([1, 2, 3])
  beziehungstyp: 1 | 2 | 3;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3])
  dienstleistungstyp?: 1 | 2 | 3;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  @Transform(({ value }) => value?.toISOString?.())
  startdatum: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  @Transform(({ value }) => value?.toISOString?.())
  enddatum: string;
}
