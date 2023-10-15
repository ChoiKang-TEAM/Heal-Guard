import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ConfirmVerifyCodeDto, SendMailDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/randomUtil'
import { getValidTime } from 'src/shared/utils/timeUtil'
import * as nodeMailer from 'nodemailer'
import { EmailVerification, Message } from '@prisma/client'
import { EventsService } from 'src/shared/services/events.service'

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService, private readonly eventService: EventsService) {}

  private async upsertEmailVerification(userId: string, randomNumber: string): Promise<EmailVerification> {
    return this.prisma.emailVerification.upsert({
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

  private async checkUserExistence(userId: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userId: userId
      }
    })
    return existingUser ? true : false
  }

  async sendVerificationEmail(dto: SendMailDto): Promise<ApiResponse<{ validTime: Date }>> {
    const dto2: Omit<Message, 'id'> = {
      msgType: 'EMAIL',
      status: 'Y',
      receiver: '',
      title: '',
      content: '',
      sender: '',
      createdAt: undefined,
      updatedAt: undefined
    }

    const { userId } = dto
    const randomNumber = generateRandomSixDigitString()
    const inUsedUserId = await this.checkUserExistence(userId)
    if (inUsedUserId)
      throw new BadRequestException({
        code: 3000
      })

    const emailVerification = await this.upsertEmailVerification(userId, randomNumber)

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
      // await transport.sendMail(mailOptions) TODO: 실제 메일은 안 가지게 설정

      return {
        code: 1000,
        result: {
          validTime: getValidTime(10)
        }
      }
    } catch (e) {
      await this.prisma.emailVerification.delete({
        where: {
          id: emailVerification.id
        }
      })
      throw new InternalServerErrorException('이메일 전송에 실패했습니다.')
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
