import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { EmailVerificationService } from '../auth/email-verification/email-verification.service'
import { SendMailDto } from './dto/message.dto'

@Controller('message')
export class MessageController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}
  @Post('/send')
  @HttpCode(200)
  async sendMail(@Body() sendMailDto: SendMailDto) {
    //return this.emailVerificationService.sendMail(sendMailDto)
  }
}
