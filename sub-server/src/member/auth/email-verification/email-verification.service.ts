import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ConfirmVerifyCodeDto, SendMailDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/randomUtil'
import { getValidTime } from 'src/shared/utils/timeUtil'
import * as nodeMailer from 'nodemailer'
import { EmailVerification } from '@prisma/client'

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async sendVerificationEMail(dto: SendMailDto): Promise<ApiResponse<null>> {
    const { userId } = dto
    this.checkUserExistence(userId)
    const randomNumber = generateRandomSixDigitString()
    const emailVerification = await this.upsertEmailVerification(userId, randomNumber)
    await this.sendEmail(userId, randomNumber, emailVerification)
    return {
      code: 1000
    }
  }

  private async checkUserExistence(userId: string): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
    if (existingUser) {
      throw new BadRequestException({ code: 3000 })
    }
  }

  private async upsertEmailVerification(userId: string, randomNumber: string): Promise<EmailVerification> {
    return await this.prisma.emailVerification.upsert({
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
  }

  private async sendEmail(userId: string, randomNumber: string, emailVerification: EmailVerification): Promise<void> {
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
    } catch (e) {
      await this.prisma.emailVerification.delete({
        where: {
          id: emailVerification.id
        }
      })
      throw new Error('이메일 전송에 실패했습니다.')
    }
  }

  async confirmVerificationCode(dto: ConfirmVerifyCodeDto): Promise<ApiResponse<null>> {
    try {
      const verfifyCode = await this.prisma.emailVerification.findUnique({
        where: {
          userId: dto.userId
        }
      })
      if (dto.verifyCode === verfifyCode.verifyCode) {
        return {
          code: 1000
        }
      } else {
        return {
          code: 3001
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
}
