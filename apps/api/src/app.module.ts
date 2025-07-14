import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/src/prisma.service';
import { KontakteService } from './controllers/kontakte/kontakte.service';
import { MieterUeberschneidungService } from './controllers/validatoren/mieterUeberschneidung/mieterUeberschneidung.service';
import { MieterUeberschneidungController } from './controllers/validatoren/mieterUeberschneidung/mieterUeberschneidung.controller';
import { ImmobilienService } from './controllers/immobilien/immobilien.service';
import { BeziehungenService } from './controllers/beziehungen/beziehungen.service';
import { BeziehungenController } from './controllers/beziehungen/beziehungen.controller';
import { ImmobilienController } from './controllers/immobilien/immobilien.controller';
import { KontakteController } from './controllers/kontakte/kontakte.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    PrismaService,
    MieterUeberschneidungService,
    ImmobilienService,
    BeziehungenService,
    KontakteService,
    AppService,
  ],
  controllers: [
    MieterUeberschneidungController,
    AppController,
    BeziehungenController,
    ImmobilienController,
    KontakteController,
  ],
})
export class AppModule {}
