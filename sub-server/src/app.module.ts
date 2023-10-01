import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './shared/prisma/prisma.module'
import { AuthModule } from './member/auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
