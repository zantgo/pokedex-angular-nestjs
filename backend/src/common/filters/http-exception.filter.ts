import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // 1. Determinar el status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 2. Extraer el mensaje correctamente
    let message: string | string[];
    
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      message = res.message || res;
    } else if (exception instanceof Error) {
      // AQUÍ ESTABA EL FALLO: capturamos el mensaje del error genérico
      message = exception.message;
    } else {
      message = 'Internal Server Error';
    }

    // 3. Determinar el nombre del error
    const errorName =
      exception instanceof HttpException
        ? (exception.getResponse() as any)?.error || 'HttpException'
        : 'Internal Server Error';

    // 4. Construir la respuesta estandarizada
    const responseBody = {
      statusCode: status,
      message: Array.isArray(message) ? message : [message],
      error: errorName,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(responseBody);
  }
}
