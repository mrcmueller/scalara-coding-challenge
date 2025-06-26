/* eslint  @typescript-eslint/no-unsafe-call: 0 */

import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, Validate } from 'class-validator';

export class BeziehungErstellenDto {
  @IsMongoId()
  immobilienId: string;

  @IsMongoId()
  kontaktId: string;

  @IsNumber()
  @Validate(
    (i: any) => typeof i === 'number' && (i === 1 || i === 2 || i === 3),
    {
      message: 'Der Beziehungstyp darf nur die Zahl 1, 2 oder 3 sein',
    },
  )
  beziehungstyp: 1 | 2 | 3;

  @IsNumber()
  @Validate(
    (i: any) => typeof i === 'number' && (i === 1 || i === 2 || i === 3),
    {
      message: 'Der Dienstleistungstyp darf nur die Zahl 1, 2 oder 3 sein',
    },
  )
  dienstleistungstyp: 1 | 2 | 3;

  @Type(() => Date)
  startdatum: Date;

  @Type(() => Date)
  enddatum: Date;
}
