import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import CreateTaskModule from '@v1/createTask.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL as string, {
      autoReconnect: true,
      useCreateIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        config: {
          url: cfg.get('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    CreateTaskModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
