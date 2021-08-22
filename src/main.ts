import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(__dirname + '/../public');
  app.setBaseViewsDir(__dirname + '/../views');
  app.setViewEngine('hbs');
  await app.listen(3000);

  const api = await NestFactory.create(ApiModule);
  api.enableCors();
  await api.listen(3001)
}
bootstrap();
