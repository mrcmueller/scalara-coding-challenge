import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {
  BeziehungenController,
  ImmobilienController,
  KontakteController,
  ImmobilienService,
} from './controllers';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@/src/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [PrismaService, ImmobilienService, AppService],
  controllers: [
    AppController,
    BeziehungenController,
    ImmobilienController,
    KontakteController,
  ],
})
export class AppModule {}
