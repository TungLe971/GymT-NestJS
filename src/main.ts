import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = new DocumentBuilder()
  .setTitle('GymT APIs')
  .setDescription("List APIs for GymT")
  .setVersion('1.0')
  .addTag('Auth')
  .addTag('Users')
  .addTag('Members')
  .addTag('Packagess')
  .addTag('Staffs')
  .addTag('Equipments')
  .addTag('Foods')
  .addBearerAuth()
  .build();
  const documnent = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnent);
  app.enableCors();
  console.log(join(__dirname, '../../uploads'))
  app.useStaticAssets(join(__dirname, '../../uploads'));
  await app.listen(5000);
}
main();
