import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import jwt_decode from "jwt-decode";
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_HEALTHY_KEY, IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class SessionGuard implements CanActivate {
    constructor(private redisService: RedisService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const token = request.headers['authorization'];
        const data = jwt_decode<any>(token.replace("Bearer ", ""));
        const session = await this.redisService.checkSessionLogin(data.sessionId);
        if (session) {
            return session
        } else {
            throw new BadRequestException("UserLogout");
        }
    }

}