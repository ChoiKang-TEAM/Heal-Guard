import { Injectable } from '@nestjs/common'
import { Role, User, UserRole } from '@prisma/client'
import { CrudService } from 'src/shared/interfaces/factory.interface'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { JoinMemberUser } from './dto/user.input'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService implements CrudService<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: JoinMemberUser): Promise<boolean> {
    try {
      const saltRound = 10
      const salt = await bcrypt.genSalt(saltRound)
      const hasshedPassword = await bcrypt.hash(dto.password, salt)
      const userSeq = uuidv4()
      await this.prisma.user.create({
        data: {
          userId: dto.userId,
          name: dto.name,
          age: dto.age,
          password: hasshedPassword,
          userSeq: userSeq,
          roles: {
            create: [
              {
                role: {
                  connect: {
                    name: UserRole.USER
                  }
                }
              }
            ]
          }
        }
      })
      return true
    } catch (e) {
      return false
    }
  }
  delete(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  update(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async findUnique(dto: { userId: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          userId: dto.userId
        },
        include: {
          roles: {
            include: {
              role: true
            }
          }
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
