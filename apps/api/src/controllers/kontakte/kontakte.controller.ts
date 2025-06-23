import { Controller, Get } from '@nestjs/common';

@Controller('kontakte')
export class KontakteController {
  @Get()
  findAll(): string {
    return 'Dies sind all meine Kontakte';
  }
}
