import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MieterUeberschneidungAntwortDTO {
  @ApiProperty()
  @IsBoolean()
  ueberschneidung: boolean;
}
