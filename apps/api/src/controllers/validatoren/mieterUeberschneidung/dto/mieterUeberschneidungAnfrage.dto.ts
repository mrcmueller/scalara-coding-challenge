import { Type } from 'class-transformer';
import { IsMongoId, IsOptional, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnddatumNachStartdatumValidator } from '@/src/controllers/beziehungen/dto/enddatumNachStartdatum.validator';

export class MieterUeberschneidungAnfrageDTO {
  @IsOptional()
  @ApiProperty()
  @IsMongoId()
  id?: string;

  @ApiProperty()
  @IsMongoId()
  immobilienId: string;

  @ApiProperty()
  @Type(() => Date)
  startdatum: Date;

  @ApiProperty()
  @Type(() => Date)
  @Validate(EnddatumNachStartdatumValidator)
  enddatum: Date;
}
