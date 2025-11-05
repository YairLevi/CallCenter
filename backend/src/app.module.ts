import { Module } from '@nestjs/common';
import { CallsModule } from './calls/calls.module';
import { MongooseModule } from "@nestjs/mongoose";
import { TagsModule } from './tags/tags.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    CallsModule,
    TagsModule,
    TasksModule,
  ],
})
export class AppModule {}
