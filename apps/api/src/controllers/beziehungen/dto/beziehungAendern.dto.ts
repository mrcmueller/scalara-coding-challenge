import { Type } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { EnddatumNachStartdatumValidator } from './enddatumNachStartdatum.validator';
import { ApiProperty } from '@nestjs/swagger';

export class BeziehungAendernDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  immobilienId?: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  kontaktId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Beziehungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  beziehungstyp?: 1 | 2 | 3;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Dienstleistungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  dienstleistungstyp?: 1 | 2 | 3;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  startdatum?: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  @Validate(EnddatumNachStartdatumValidator)
  enddatum?: Date;
}
