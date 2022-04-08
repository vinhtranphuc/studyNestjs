import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { escapeJson } from '../utils';

export interface CommonResult<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, CommonResult<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<CommonResult<T>> {
        return next.handle().pipe(map(data => {
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                success: true,
                message: "Success",
                data: data //escapeJson(data)
            }
        }));
    }
}