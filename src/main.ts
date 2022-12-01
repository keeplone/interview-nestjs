import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const env = process.env.NODE_ENV || 'development';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Order Api')
    .setDescription('order api')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://')
    .addServer('https://')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (env !== 'production') {
    SwaggerModule.setup('', app, document);
  }

  await app.listen(port);
}
bootstrap();
