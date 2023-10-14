import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from './shared/prisma/prisma.module'
import { AuthModule } from './member/auth/auth.module'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksService } from './shared/services/tasks.service'
import { UserModule } from './member/user/user.module'
import { MessageModule } from './member/message/message.module'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { MessagesEventHandler } from './shared/handlers/messages-event.handler'

@Module({
  imports: [PrismaModule, AuthModule, ScheduleModule.forRoot(), UserModule, MessageModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, TasksService, MessagesEventHandler]
})
export class AppModule {}
