import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { EmailVerificationService } from '../auth/email-verification/email-verification.service'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Module({
  providers: [MessageService, EmailVerificationService, PrismaService],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
