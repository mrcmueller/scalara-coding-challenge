/* eslint  @typescript-eslint/no-unsafe-call: 0 */

import {
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { AdresseErstellenDto } from '../../adressen/dto/adresseErstellen.dto';
import { Type } from 'class-transformer';
import { EineProperty } from './eineProperty';

export class ImmobilieErstellenDto {
  @IsString()
  @MinLength(1, {
    message: 'Der Name muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(100, {
    message: 'Der Name darf maximal 100 Zeichen enthalten',
  })
  name: string;

  @IsString()
  @MinLength(15, {
    message: 'Die Beschreibung muss mindestens 15 Zeichen enthalten',
  })
  @MaxLength(300, {
    message: 'Die Beschreibung darf maximal 300 Zeichen enthalten',
  })
  beschreibung: string;

  @Validate(EineProperty)
  @IsOptional()
  @ValidateNested()
  @Type(() => AdresseErstellenDto)
  adresse: AdresseErstellenDto;

  @Validate(EineProperty)
  @IsOptional()
  @IsMongoId()
  adressenId: string;
}
