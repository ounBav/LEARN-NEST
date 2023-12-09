/* eslint-disable prettier/prettier */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const statusCode: number = exception.getStatus();
    const response = exception.getResponse() as {
      statusCode: number;
      message: string | string[];
      error: string;
    };
    const message = Array.isArray(response.message)
      ? response.message[0]
      : response.message;

    if (statusCode >= 500) {
      console.log(exception);
    } else {
      console.log(response);
    }

    res.status(statusCode).json({ error: { statusCode, message } });
  }
}
