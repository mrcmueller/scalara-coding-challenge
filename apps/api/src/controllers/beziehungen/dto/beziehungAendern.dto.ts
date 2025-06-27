import { Type } from 'class-transformer';
import {
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  Validate,
} from 'class-validator';
import { EnddatumNachStartdatumValidator } from './enddatumNachStartdatum.validator';

export class BeziehungAendernDto {
  @IsOptional()
  @IsMongoId()
  immobilienId?: string;

  @IsOptional()
  @IsMongoId()
  kontaktId?: string;

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Beziehungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  beziehungstyp?: 1 | 2 | 3;

  @IsOptional()
  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Dienstleistungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  dienstleistungstyp?: 1 | 2 | 3;

  @IsOptional()
  @Type(() => Date)
  startdatum?: Date;

  @IsOptional()
  @Type(() => Date)
  // @Validate(EnddatumNachStartdatumValidator)
  enddatum?: Date;
}
