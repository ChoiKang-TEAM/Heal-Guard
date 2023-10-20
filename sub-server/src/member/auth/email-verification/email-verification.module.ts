import { Module } from '@nestjs/common'
import { EmailVerificationService } from './email-verification.service'
import { EmailVerificationController } from './email-verification.controller'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { MessageService } from 'src/member/message/message.service'

@Module({
  providers: [EmailVerificationService, PrismaService, MessageService],
  controllers: [EmailVerificationController],
  exports: [EmailVerificationService]
})
export class EmailVerificationModule {}
