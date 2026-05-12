import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // CONFIG SWAGGER
  const config =
    new DocumentBuilder()

      .setTitle(
        'Microservice Vehicles API',
      )

      .setDescription(
        'API de vehículos',
      )

      .setVersion('1.0')

      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'docs',
    app,
    document,
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log('Starting application on port', process.env.PORT ?? 3001);
}
bootstrap();
