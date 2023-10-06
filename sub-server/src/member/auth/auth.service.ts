import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Role, User, UserRole } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { LoginMemberUserDto } from '../user/dto/user.input'
import { UserService } from '../user/user.service'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { ExtendsUser } from '../user/entity/user.entity'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService, private readonly userService: UserService) {}

  async createToken(user: User): Promise<string> {
    const payload = { id: user.id, userId: user.userId, userSeq: user.userSeq, age: user.age }
    return this.jwtService.sign(payload)
  }

  async validateUser(loginMemberUserDto: LoginMemberUserDto) {
    const userIdDto: Omit<LoginMemberUserDto, 'password'> = {
      userId: loginMemberUserDto.userId
    }
    const user = await this.userService.findUnique(userIdDto)
    if (!user) {
      throw new UnauthorizedException('Invalid userId')
    }
    const isValidPassword = await bcrypt.compare(loginMemberUserDto.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password')
    }
    return user
  }
  async login(
    user: User & {
      roles: ({
        role: {
          id: number
          name: UserRole
        }
      } & {
        id: number
        userId: number
        roleId: number
      })[]
    }
  ) {
    const payload = { userSeq: user.userSeq, roles: user.roles.map((v) => v.role.name) }
    const refreshToken = await this.createRefreshToken(user.id)
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken
    }
  }

  private async createRefreshToken(userId: number): Promise<string> {
    const token = this.jwtService.sign({ id: userId }, { expiresIn: '30d' })
    await this.prisma.refreshToken.create({
      data: { token, userId }
    })
    return token
  }

  async findRefreshToken(token: string) {
    return this.prisma.refreshToken.findUnique({ where: { token } })
  }

  async revokeRefreshToken(token: string) {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { isRevoked: true }
    })
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token)
  }
}
