import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1')

  const nodeEnv = process.env.NODE_ENV || 'development';
  const port = process.env.PORT || (nodeEnv === 'production' ? 80 : 3000);

  // CORS configuration based on environment
  let allowedOrigin = 'all'
  if (nodeEnv === 'development') {
    app.enableCors();
  } else {
    allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost';
    app.enableCors({ origin: [allowedOrigin] });
  }

  await app.listen(port);
}
bootstrap();
