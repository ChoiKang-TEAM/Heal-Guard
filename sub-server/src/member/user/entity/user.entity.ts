import { Role, User } from '@prisma/client'

export class ExtendsUser implements User {
  id: number
  userId: string
  password: string
  name: string
  userSeq: string
  createdAt: Date
  updatedAt: Date
  age: number
  roles: string[]
}
