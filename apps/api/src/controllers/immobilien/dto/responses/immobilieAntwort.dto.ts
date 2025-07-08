import { Land } from '@/generated/prisma';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum } from 'class-validator';

export class ImmobilieAntwortDto {
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
}
