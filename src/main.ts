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
    checkConfiguration(configService);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}

// function initializeDatabase(mongoDBUri: string) {
// Получить данные
// Проверить подключение
// const typeOrmConnection = TypeOrmModule.
// Проверить наличие базы
// Если нет создать базу, если есть продолжить
// }

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

function checkConfiguration(configService) {
  const config = {
    dbUrl: configService.get('MONGODB_URL'),
    dbName: configService.get('MONGODB_NAME'),
    envType: configService.get('ENV'),
  };

  Object.entries(config).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Configuration ${key} is not defined or empty.`);
    }
  });
}
