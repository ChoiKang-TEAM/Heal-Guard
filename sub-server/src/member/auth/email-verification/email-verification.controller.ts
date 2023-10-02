import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ConfirmVerifyCodeDto, SendMailDto } from './dto/email-verification.dto'
import { EmailVerificationService } from './email-verification.service'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'

@Controller('email/verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @Post('/send')
  @HttpCode(200)
  async sendMail(@Body() sendMailDto: SendMailDto): Promise<ApiResponse<null>> {
    return this.emailVerificationService.sendVerificationEmail(sendMailDto)
  }

  @Post('/confirm')
  @HttpCode(200)
  async confirmVerifyCode(@Body() confirmVerifyCodeDto: ConfirmVerifyCodeDto): Promise<ApiResponse<null>> {
    return this.emailVerificationService.confirmVerificationCode(confirmVerifyCodeDto)
  }
}
