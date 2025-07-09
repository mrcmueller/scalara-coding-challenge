/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ImmobilieAntwortDto } from '../../../immobilien/dto/responses/immobilieAntwort.dto';
import { KontaktAntwortDto } from '../../../kontakte/dto/responses/kontaktAntwort.dto';
import { Exclude, Transform } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

const logger = new Logger();

export class BeziehungAntwortDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: KontaktAntwortDto })
  kontakt: KontaktAntwortDto;

  @ApiProperty({ type: ImmobilieAntwortDto })
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
  @Transform(({ value }) => {
    const date = new Date(value);
    return date.toISOString();
  })
  startdatum: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  @Transform(({ value }) => {
    const date = new Date(value);
    return date.toISOString();
  })
  enddatum: string;

  @Exclude()
  immobilienId: string;

  @Exclude()
  kontaktId: string;
}
