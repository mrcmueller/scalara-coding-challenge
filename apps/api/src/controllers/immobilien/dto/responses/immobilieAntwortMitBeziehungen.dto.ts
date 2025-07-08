import { Land } from '@/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested } from 'class-validator';
import { BeziehungenEingefuegtDto } from '../../beziehungenEingefuegt.dto';

export class ImmobilieAntwortMitBeziehungenDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  beschreibung: string;

  @ApiProperty()
  @IsString()
  strasse: string;

  @ApiProperty()
  @IsString()
  hausnummer: string;

  @ApiProperty()
  @IsString()
  postleitzahl: string;

  @ApiProperty()
  @IsString()
  stadt: string;

  @ApiProperty({ enum: Land })
  @IsEnum(Land)
  land: Land;

  @ApiProperty({ type: () => [BeziehungenEingefuegtDto] })
  @ValidateNested({ each: true })
  @Type(() => BeziehungenEingefuegtDto)
  beziehungen: BeziehungenEingefuegtDto[];
}
