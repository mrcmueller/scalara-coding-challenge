import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  BeziehungenController,
  ImmobilienController,
  KontakteController,
  ImmobilienService,
  BeziehungenService,
} from './controllers';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/src/prisma.service';
import { KontakteService } from './controllers/kontakte/kontakte.service';
import { MieterUeberschneidungService } from './controllers/validatoren/mieterUeberschneidung/mieterUeberschneidung.service';
import { MieterUeberschneidungController } from './controllers/validatoren/mieterUeberschneidung/mieterUeberschneidung.controller';

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
