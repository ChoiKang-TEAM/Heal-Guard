import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common'
import { Response } from 'express'

// TODO: class 명 변경
@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const exceptionResponse = exception.getResponse()
    const error = typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as { message: string[]; error: string })
    console.log(exception, host)
    let errorCode = 2000 // 기본 에러 코드
    if (status === 400) {
      errorCode = 2000
    }

    response.status(status).json({
      code: errorCode,
      result: {
        error: error.message
      }
    })
  }
}
