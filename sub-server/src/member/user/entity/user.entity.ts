import { $Enums, Role, User } from '@prisma/client'

export class ExtendsUser implements User {
  status: $Enums.Status
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
