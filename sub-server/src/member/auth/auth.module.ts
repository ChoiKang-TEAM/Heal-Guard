import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { JwtStrategy } from './jwt.strategy'
import { UserModule } from '../user/user.module'
import { EventsService } from 'src/shared/services/events.service'
import { EmailVerificationModule } from './email-verification/email-verification.module'

@Module({
  providers: [AuthService, JwtStrategy, PrismaService, EventsService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' }
    }),
    UserModule,
    EmailVerificationModule
  ],
  exports: [AuthService, JwtModule, JwtStrategy]
})
export class AuthModule {}
