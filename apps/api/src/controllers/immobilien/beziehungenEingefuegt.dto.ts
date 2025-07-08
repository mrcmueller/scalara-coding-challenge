/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Exclude, Transform } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BeziehungenEingefuegtDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsMongoId()
  @IsString()
  immobilienId: string;

  @ApiProperty()
  @IsMongoId()
  @IsString()
  kontaktId: string;

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
