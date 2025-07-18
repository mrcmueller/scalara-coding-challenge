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
import { ApiProperty } from '@nestjs/swagger';

export class KontaktAendernDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Name muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(100, {
    message: 'Der Name darf maximal 100 Zeichen enthalten',
  })
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Straßenname muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(60, {
    message: 'Der Straßenname darf maximal 60 Zeichen enthalten',
  })
  strasse?: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsOptional()
  @IsPostalCode('DE')
  postleitzahl?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1, {
    message: 'Der Stadtname muss mindestens 1 Zeichen enthalten',
  })
  @MaxLength(60, {
    message: 'Der Stadtname darf maximal 60 Zeichen enthalten',
  })
  stadt?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Land, {
    message: 'Land muss Deutschland, Italien oder Frankreich sein',
  })
  land?: 'Deutschland' | 'Italien' | 'Frankreich';
}
