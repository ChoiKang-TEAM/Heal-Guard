import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './shared/prisma/prisma.module'
import { AuthModule } from './member/auth/auth.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksService } from './shared/services/tasks.service'

@Module({
  imports: [PrismaModule, AuthModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TasksService]
})
export class AppModule {}
