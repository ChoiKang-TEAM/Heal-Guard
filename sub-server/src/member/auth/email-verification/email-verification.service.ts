import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { SendMailDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/randomUtil'
import { getValidTime } from 'src/shared/utils/timeUtil'
import * as nodeMailer from 'nodemailer'

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async sendVerificationEMail(dto: SendMailDto): Promise<ApiResponse<null>> {
    const { userId } = dto
    const randomNumber = generateRandomSixDigitString()
    const emailVerification = await this.prisma.emailVerification.upsert({
      where: {
        userId: userId
      },
      create: {
        userId: userId,
        verifyCode: randomNumber,
        validTime: getValidTime(10)
      },
      update: {
        verifyCode: randomNumber,
        validTime: getValidTime(10)
      }
    })
    try {
      const transport = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_MAIL_USERID,
          pass: process.env.AUTH_MAIL_PASSWORD
        }
      })
      const mailOptions = {
        to: userId,
        subject: '인증 번호 발급',
        html: `<h3>${randomNumber}</h3>`
      }
      await transport.sendMail(mailOptions)

      return {
        code: 1000
      }
    } catch (e) {
      await this.prisma.emailVerification.delete({
        where: {
          id: emailVerification.id
        }
      })
      throw new Error('이메일 전송에 실패했습니다.')
    }
  }
}
