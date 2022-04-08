import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateInputPipe } from './common/validations/validate.pipe';
import { HttpExceptionInterceptor } from './common/helpers/http-exception.interceptor';
import { Logger } from '@nestjs/common';
import { TransformInterceptor } from './common/helpers/transform.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseAddHeaderInterceptor } from './common/helpers/response-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.get<ConfigService>(ConfigService);
  app.useGlobalPipes(new ValidateInputPipe());
  app.useGlobalFilters(new HttpExceptionInterceptor(new Logger()));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ResponseAddHeaderInterceptor());
  const corsOptions = {
    origin: ['http://admin.asyncw.ai', 'http://admin-dev.asyncw.ai', 'https://admin.asyncw.ai', 'https://admin-dev.asyncw.ai'
      , 'http://localhost:8081', 'http://localhost:8080', 'http://localhost:4000', 'https://demo-dev.asyncw.ai', 'https://async-dev-frontend.datafluct.com'],
    credentials: true,
  }
  const config = new DocumentBuilder()
    .setTitle('Datafluck Admin')
    .setDescription('The admin API description')
    .setVersion('1.0')
    .addTag('admin')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
