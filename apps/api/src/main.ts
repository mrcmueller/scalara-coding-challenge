import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { StripUndefinedPipe } from './StripUndefinedPipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Scalara API')
    .setDescription('Eine API für Scalara')
    .setVersion('1.0')
    // .addTag('scalara')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
    new StripUndefinedPipe(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
