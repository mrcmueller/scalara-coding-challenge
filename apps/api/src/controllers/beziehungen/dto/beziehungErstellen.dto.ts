import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { EnddatumNachStartdatumValidator } from './enddatumNachStartdatum.validator';
import { ApiProperty } from '@nestjs/swagger';

export class BeziehungErstellenDto {
  @ApiProperty()
  @IsMongoId()
  immobilienId: string;

  @ApiProperty()
  @IsMongoId()
  kontaktId: string;

  @ApiProperty()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Beziehungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  beziehungstyp: 1 | 2 | 3;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Dienstleistungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  dienstleistungstyp?: 1 | 2 | 3;

  @ApiProperty()
  @IsDate({ message: 'Startdatum muss ein Datum sein' })
  @Type(() => Date)
  startdatum: Date;

  @ApiProperty()
  @IsDate({ message: 'Enddatum muss ein Datum sein' })
  @Type(() => Date)
  @Validate(EnddatumNachStartdatumValidator)
  enddatum: Date;
}
