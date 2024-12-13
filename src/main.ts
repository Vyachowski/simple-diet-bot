import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  try {
    const appConfig = getAppConfig(configService);
    checkAppConfig(appConfig);
    configureSwagger(app);

    await app.listen(appConfig.appPort);
  } catch (e) {
    console.error('Application failed to start:', e.message);
    console.error(e.stack);
    process.exit(1);
  }
}

// SECTION: App configuration
function configureSwagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Clean diet app API docs')
    .setDescription('Clean diet API description')
    .setVersion('1.0')
    .addTag('Diet')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

function checkAppConfig(config) {
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(
        `Missing configuration: "${key}" is not defined or empty.`,
      );
    }
  });
}

function getAppConfig(configService) {
  const DEFAULT_APP_PORT = 3000;

  return {
    dbUrl: configService.get(ConfigRecord.dbUrl),
    dbName: configService.get(ConfigRecord.dbName),
    envType: configService.get(ConfigRecord.envType),
    appPort: configService.get(ConfigRecord.appPort) ?? DEFAULT_APP_PORT,
  };
}

enum ConfigRecord {
  dbUrl = 'MONGODB_URL',
  dbName = 'MONGODB_NAME',
  envType = 'ENV',
  appPort = 'PORT',
}
