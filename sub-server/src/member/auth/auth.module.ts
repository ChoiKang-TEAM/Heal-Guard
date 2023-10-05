import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { EmailVerificationModule } from './email-verification/email-verification.module'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { JwtStrategy } from './jwt.strategy'
import { UserService } from '../user/user.service'

@Module({
  providers: [AuthService, JwtStrategy, PrismaService, UserService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }
    }),
    EmailVerificationModule
  ],
  exports: [AuthService, JwtModule, JwtStrategy]
})
export class AuthModule {}
