import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Message } from '@prisma/client'

@Injectable()
export class MessagesEventHandler {
  @OnEvent('message.send')
  handlerMessageSendEvent(message: Message) {
    try {
      console.log(message)
    } catch (e) {
      console.log(e)
    }
  }
}
