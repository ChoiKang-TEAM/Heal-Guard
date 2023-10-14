import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Message } from '@prisma/client'

@Injectable()
export class EventsService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  sendMessage(message: Message) {
    try {
      console.log(1)
      this.eventEmitter.emit('message.send', message)
    } catch (e) {
      console.log(e)
    }
  }
}
