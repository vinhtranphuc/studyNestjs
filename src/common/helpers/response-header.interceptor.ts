import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';
import { escapeJson } from '../utils';

@Injectable()
export class ResponseAddHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let request = context.switchToHttp().getRequest();
        if (request.body)
            request.body = escapeJson(request.body)
        if (request.query)
            request.query = escapeJson(request.query)
        const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
        ResponseObj.setHeader("Cache-Control", "no-cache, no-store"); // HTTP 1.1.
        ResponseObj.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        ResponseObj.setHeader("Expires", new Date(new Date().getTime() - 86409000000).toUTCString()); // Proxies.
        ResponseObj.setHeader("X-XSS-Protection", "1; mode=block");
        ResponseObj.setHeader("X-Content-Type-Options", "nosniff");
        return next.handle();
    }
}