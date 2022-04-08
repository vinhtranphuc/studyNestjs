import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
@Global()
@Module({
    imports: [
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                config: {
                    url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`,
                },
            }),
        }),
    ],
    controllers: [],
    providers: [RedisService],
    exports: [RedisService]
})
export class RedisCacheModule { }
