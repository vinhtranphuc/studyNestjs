import { Injectable, Inject, CACHE_MANAGER, ConsoleLogger } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Console } from 'console';

@Injectable()
export class RedisService {
    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async removeSessionLogin(id) {
        const redisData = await this.redis.keys('*');
        for (let index = 0; index < redisData.length; index++) {
            const key = redisData[index];
            let currentRedis = await this.redis.get(key);
            if (currentRedis) {
                let redisObj: any;
                try {
                    redisObj = JSON.parse(currentRedis)
                } catch (e) {
                    await this.redis.del(key);
                    redisObj = null;
                }
                if (redisObj && redisObj.passport && Number(redisObj.passport.user.id) === Number(id)) {
                    await this.redis.del(key);
                }

            }
        }
        return { redisData };
    }
    async checkSessionLogin(key) {
        const session = await this.redis.get("sess:" + key);
        return session ? true : false
    }
}