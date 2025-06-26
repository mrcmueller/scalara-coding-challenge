import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Land } from '@/generated/prisma';

export class KontakteAendernDto {
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
  land?: 'Deutschland' | 'Italien' | 'Frankreich';

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  beziehungen?: string[];
}
