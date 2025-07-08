import { Land } from '@/generated/prisma';
import { BeziehungAntwortDto } from '@/src/controllers/beziehungen/dto/responses/beziehungAntwort.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEnum, ValidateNested } from 'class-validator';

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

  @ApiProperty({ type: () => [BeziehungAntwortDto] })
  @ValidateNested({ each: true })
  @Type(() => BeziehungAntwortDto)
  items: BeziehungAntwortDto[];
}
