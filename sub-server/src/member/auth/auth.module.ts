import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { EmailVerificationService } from './email-verification/email-verification.service'

@Module({
  providers: [AuthService, JwtStrategy, PrismaService, EmailVerificationService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }
    }),
    UserModule
  ],
  exports: [AuthService, JwtModule, JwtStrategy]
})
export class AuthModule {}
