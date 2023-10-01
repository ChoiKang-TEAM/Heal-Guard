import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { EmailVerificationModule } from './email-verification/email-verification.module'

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [EmailVerificationModule]
})
export class AuthModule {}
