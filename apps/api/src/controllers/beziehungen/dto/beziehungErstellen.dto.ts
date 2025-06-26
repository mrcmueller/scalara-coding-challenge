import { Type } from 'class-transformer';
import { IsIn, IsMongoId, IsNumber, Validate } from 'class-validator';

export class BeziehungErstellenDto {
  @IsMongoId()
  immobilienId: string;

  @IsMongoId()
  kontaktId: string;

  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Beziehungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  beziehungstyp: 1 | 2 | 3;

  @IsNumber()
  @IsIn([1, 2, 3], {
    message: 'Der Dienstleistungstyp darf nur die Zahl 1, 2 oder 3 sein',
  })
  dienstleistungstyp: 1 | 2 | 3;

  @Type(() => Date)
  startdatum: Date;

  @Type(() => Date)
  enddatum: Date;
}
