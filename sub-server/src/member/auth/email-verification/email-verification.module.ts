import { Module } from '@nestjs/common'
import { EmailVerificationService } from './email-verification.service'
import { PrismaModule } from 'src/shared/prisma/prisma.module'
import { EmailVerificationController } from './email-verification.controller'

@Module({
  providers: [EmailVerificationService],
  controllers: [EmailVerificationController],
  imports: [PrismaModule]
})
export class EmailVerificationModule {}
