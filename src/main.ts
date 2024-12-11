import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const CONFIG_VALUES = {
  dbUrl: 'MONGODB_URL',
  dbName: 'MONGODB_NAME',
  envType: 'ENV',
};

bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  try {
    const appConfig = getAppConfig(configService);
    checkAppConfiguration(appConfig);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

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

function checkAppConfiguration(config) {
  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Configuration ${key} is not defined or empty.`);
    }
  });
}

function getAppConfig(configService) {
  return {
    dbUrl: configService.get(CONFIG_VALUES.dbUrl),
    dbName: configService.get(CONFIG_VALUES.dbName),
    envType: configService.get(CONFIG_VALUES.dbUrl),
  };
}
