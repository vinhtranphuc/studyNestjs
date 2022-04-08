
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger, ConflictException } from '@nestjs/common';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionInterceptor implements ExceptionFilter {
    constructor(private logger: Logger) {
        this.logger = new Logger("Logging exception service");
    }

    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response: Response = ctx.getResponse();
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setHeader("Expires", "0"); // Proxies.
        response.setHeader("X-XSS-Protection", "1; mode=block");
        response.setHeader("X-Content-Type-Options", "nosniff");
        // Handling error message and logging
        this.handleMessage(exception);

        // Response to client
        HttpExceptionInterceptor.handleResponse(response, exception);
    }

    private static handleResponse(response: Response, exception: HttpException | QueryFailedError | Error): void {
        let responseBody: any = { message: 'Internal server error' };
        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            responseBody = exception.getResponse();
            statusCode = exception.getStatus();
        } else if (exception instanceof QueryFailedError) {
            statusCode = HttpStatus.BAD_REQUEST;
            if (exception.message.includes("duplicate key")) {
                statusCode = HttpStatus.CONFLICT;
            }
            responseBody = {
                statusCode: statusCode,
                message: exception.message,
            }
        } else if (exception instanceof Error) {
            responseBody = {
                statusCode: statusCode,
                message: exception.stack,
            }
        }
        response.status(statusCode).json(responseBody);
    }

    private handleMessage(exception: HttpException | QueryFailedError | Error): void {
        let message = 'Internal Server Error';

        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse());
        } else if (exception instanceof QueryFailedError) {
            message = exception.message.toString();
        } else if (exception instanceof Error) {
            message = exception.stack.toString();
        }
        this.logger.error(message);
    }
}