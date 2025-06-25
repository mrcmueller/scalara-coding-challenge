/* eslint  @typescript-eslint/no-unsafe-call: 0 */

import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EineProperty } from './eineProperty';
import { AdresseAendernDto } from '../../adressen/dto/adresseAendern.dto';

export class ImmobilieAendernDto {
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Name muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(100, {
    message: 'Der Name darf maximal 100 Zeichen enthalten',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(15, {
    message: 'Die Beschreibung muss mindestens 15 Zeichen enthalten',
  })
  @MaxLength(300, {
    message: 'Die Beschreibung darf maximal 300 Zeichen enthalten',
  })
  beschreibung?: string;

  @IsOptional()
  @Validate(EineProperty)
  @ValidateNested()
  @Type(() => AdresseAendernDto)
  adresse?: AdresseAendernDto;

  // Mach in Zukunft verpflichtend wenn nicht leeres Adressobjekt enthalten
  @IsOptional()
  @IsMongoId()
  adressenId?: string;
}
