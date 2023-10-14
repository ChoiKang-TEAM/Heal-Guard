import { Injectable } from '@nestjs/common'
import { $Enums, Role, User, UserRole } from '@prisma/client'
import { CrudService } from 'src/shared/interfaces/factory.interface'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { JoinMemberUser } from './dto/user.input'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService implements CrudService<User> {
  constructor(private readonly prisma: PrismaService) {}
  findAll(): Promise<{ id: number; userId: string; password: string; name: string; userSeq: string; status: $Enums.Status; createdAt: Date; updatedAt: Date; age: number }[]> {
    throw new Error('Method not implemented.')
  }
  findByFilter(
    dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; status: $Enums.Status; createdAt: Date; updatedAt: Date; age: number }>
  ): Promise<{ id: number; userId: string; password: string; name: string; userSeq: string; status: $Enums.Status; createdAt: Date; updatedAt: Date; age: number }[]> {
    throw new Error('Method not implemented.')
  }

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
      // 타 db에 데이터 저장

      return true
    } catch (e) {
      if (e.response.data.code === 2000) {
        // 롤백
      }
      return false
    }
  }
  delete(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  update(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  async findUnique(dto: { userId?: string; id?: number }) {
    const whereCondition = dto.userId ? { userId: dto.userId } : { id: dto.id }
    if (Object.keys(whereCondition).length === 0) {
      throw new Error('No valid conditions provided for user lookup.')
    }
    try {
      const user = await this.prisma.user.findUnique({
        where: whereCondition,
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
}
