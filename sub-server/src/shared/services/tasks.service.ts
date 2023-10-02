import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const currentDate = new Date()
    const count = await this.prisma.emailVerification.count({
      where: {
        validTime: {
          lt: currentDate
        }
      }
    })
    if (count > 0) {
      const expiredEmailVerification = await this.prisma.emailVerification.deleteMany({
        where: {
          validTime: {
            lt: currentDate
          }
        }
      })
      this.logger.debug(`이메일 인증 유효시간이 만료된 ${expiredEmailVerification.count}개의 행이 삭제되었습니다.`)
    } else return
  }
}
