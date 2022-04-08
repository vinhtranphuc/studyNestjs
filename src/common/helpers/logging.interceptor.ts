
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { hrtime } from 'process';

@Injectable()
export class LoggingInterceptor implements NestMiddleware {
    private logger = new Logger('HTTP Request');

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request; 
        const userAgent = request.get("user-agent") || "";
        const startTime = hrtime.bigint();
        response.on("close", () => {
            const { statusCode } = response;
            const contentLength = response.get("content-length");
            const processingDuration = hrtime.bigint() - startTime;
            this.logger.log(
                `${ip} ${method} ${statusCode} ${originalUrl} ${contentLength ? contentLength : 0} byte ${userAgent} - ${processingDuration} ns`,
            );
        });
        next();
    }
}