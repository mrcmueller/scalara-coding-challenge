import { Type } from 'class-transformer';
import { IsMongoId, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnddatumNachStartdatumValidator } from '@/src/controllers/beziehungen/dto/enddatumNachStartdatum.validator';

export class MieterUeberschneidungAnfrageDTO {
  @ApiProperty()
  @IsMongoId()
  immobilienId: string;

  @ApiProperty()
  @IsMongoId()
  kontaktId: string;

  @ApiProperty()
  @Type(() => Date)
  startdatum: Date;

  @ApiProperty()
  @Type(() => Date)
  @Validate(EnddatumNachStartdatumValidator)
  enddatum: Date;
}
