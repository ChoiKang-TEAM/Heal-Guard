import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ConfirmVerifyCodeDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/random.util'
import { getValidTime } from 'src/shared/utils/time.util'
import { EmailVerification, User } from '@prisma/client'
import { MessageService } from 'src/member/message/message.service'
import { SendMailDto } from 'src/member/message/dto/message.dto'

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

  async sendVerificationEmail(dto: Pick<User, 'userId'>): Promise<ApiResponse<{ validTime: Date }>> {
    const { userId } = dto
    const randomNumber = generateRandomSixDigitString()
    const inUsedUserId = await this.checkUserExistence(userId)
    if (inUsedUserId)
      throw new BadRequestException({
        code: 3000
      })
    try {
      const emailVerificationPromise = this.prisma.emailVerification.upsert({
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
      const emailMessagePromise = this.prisma.message.create({
        data: {
          msgType: 'EMAIL',
          content: randomNumber,
          status: 'W',
          receiver: userId
        }
      })
      await this.prisma.$transaction([emailVerificationPromise, emailMessagePromise])

      return {
        code: 1000,
        result: {
          validTime: getValidTime(10)
        }
      }
    } catch (e) {
      throw new InternalServerErrorException({
        code: 2001 // TODO Error Code
      })
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
