import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ConfirmVerifyCodeDto, SendMailDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/randomUtil'
import { getValidTime } from 'src/shared/utils/timeUtil'
import { EmailVerification } from '@prisma/client'
import { MessageService } from 'src/member/message/message.service'

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService, private readonly messageService: MessageService) {}

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
    const { userId } = dto
    const randomNumber = generateRandomSixDigitString()
    const inUsedUserId = await this.checkUserExistence(userId)
    if (inUsedUserId)
      throw new BadRequestException({
        code: 3000
      })

    const emailVerification = await this.upsertEmailVerification(userId, randomNumber)

    try {
      this.messageService.sendMail(dto.userId, 'title', randomNumber)
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
