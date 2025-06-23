import { Controller, Get } from '@nestjs/common';

@Controller('beziehungen')
export class BeziehungenController {
  @Get()
  findAll(): string {
    return 'Das sind all meine Beziehungen';
  }
}
