/* eslint  @typescript-eslint/no-unsafe-call: 0 */

import {
  IsEnum,
  IsOptional,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Land } from '@/generated/prisma';
import { LandString } from '../adressenTypes';

export class AdresseAendernDto {
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Straßenname muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(60, {
    message: 'Der Straßenname darf maximal 60 Zeichen enthalten',
  })
  strasse?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Die Hausnummer muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(20, {
    message: 'Die Hausnummer darf maximal 20 Zeichen enthalten',
  })
  @Matches(/\d/, {
    message: 'Die Hausnummer muss mindestens eine Ziffer enthalten',
  })
  hausnummer?: string;

  @IsOptional()
  @IsPostalCode('DE')
  postleitzahl?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Stadtname muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(60, {
    message: 'Der Stadtname darf maximal 60 Zeichen enthalten',
  })
  stadt?: string;

  @IsOptional()
  @IsEnum(Land, {
    message: 'Land muss Deutschland, Italien oder Frankreich sein',
  })
  land?: LandString;
}
