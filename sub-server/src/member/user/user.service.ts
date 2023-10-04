import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CrudService } from 'src/shared/interfaces/factory.interface'

@Injectable()
export class UserService implements CrudService<User> {
  create(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  delete(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  update(dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findUnique(
    dto: Partial<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }>
  ): Promise<{ id: number; userId: string; password: string; name: string; userSeq: string; createdAt: Date; updatedAt: Date; age: number }> {
    throw new Error('Method not implemented.')
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
