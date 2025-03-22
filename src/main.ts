import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './modules/common/app.config.service';
import { HttpExceptionFilter } from './modules/common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  const appConfigService = app.get(AppConfigService);
  const appConfig = appConfigService.getAppConfig();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Customer Onboarding API')
    .setDescription('API for managing customer onboarding')
    .setVersion('1.0')
    .addServer(appConfig.app.apiBaseUrl)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api_docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = appConfig.app.port;
  app.enableShutdownHooks();
  await app.listen(port, '0.0.0.0');
  console.log(`API listening on port ${port}`);
  console.log(`Swagger docs available at ${appConfig.app.apiBaseUrl}/api_docs`);
}

bootstrap();
