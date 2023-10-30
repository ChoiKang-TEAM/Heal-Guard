import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ConfirmVerifyCodeDto } from './dto/email-verification.dto'
import { ApiResponse } from 'src/shared/dtos/api-response.dto'
import { generateRandomSixDigitString } from 'src/shared/utils/random.util'
import { getValidTime } from 'src/shared/utils/time.util'
import { MessageService } from 'src/member/message/message.service'
import { SendMailDto } from 'src/member/message/dto/message.dto'
import { AuthMismatchException, InUsedUserException } from 'src/shared/exceptions/user.exception'
import { PrismaException } from 'src/shared/exceptions/prisma.exception'
import { RESPONSE_CODES } from 'src/shared/utils/response.util'

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService, private readonly messageService: MessageService) {}

  private async checkUserExistence(userId: string): Promise<boolean> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          userId: userId
        }
      })
      return existingUser ? true : false
    } catch (e) {
      throw new PrismaException()
    }
  }

  async createVerifyCodeEmail(dto: SendMailDto): Promise<ApiResponse<{ validTime: Date }>> {
    const { to: userId } = dto
    const randomNumber = generateRandomSixDigitString()
    const inUsedUserId = await this.checkUserExistence(userId)
    if (inUsedUserId) throw new InUsedUserException()
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

      return new ApiResponse(RESPONSE_CODES.SUCCESS, {
        validTime: getValidTime(10)
      })
    } catch (e) {
      throw new PrismaException()
    }
  }

  async confirmVerificationCode(dto: ConfirmVerifyCodeDto): Promise<ApiResponse<null>> {
    try {
      const verfifyCode = await this.prisma.emailVerification.findUnique({
        where: {
          userId: dto.userId
        }
      })
      if (dto.verifyCode === verfifyCode.verifyCode) return new ApiResponse(RESPONSE_CODES.SUCCESS)
      else throw new AuthMismatchException()
    } catch (e) {
      console.error(e)
    }
  }
}
