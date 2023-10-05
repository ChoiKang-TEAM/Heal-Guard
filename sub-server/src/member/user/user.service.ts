import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CrudService } from 'src/shared/interfaces/factory.interface'
import { PrismaService } from 'src/shared/prisma/prisma.service'

@Injectable()
export class UserService implements CrudService<User> {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  delete(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  update(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async findUnique(dto: { userId: string }): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userId: dto.userId
        }
      })
      return user
    } catch (e) {}
  }
  findAll(): Promise<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }[]> {
    throw new Error('Method not implemented.')
  }
  findByFilter(
    dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>
  ): Promise<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }[]> {
    throw new Error('Method not implemented.')
  }
}
