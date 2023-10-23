import { Body, Controller, HttpCode, Post, Response, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginMemberUserDto } from '../user/dto/user.input'
import { InvalidUserException } from 'src/shared/exceptions/user.exception'
import { UserService } from '../user/user.service'
import { Response as ExpressResponse } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginMemberUserDto: LoginMemberUserDto, @Response() res: ExpressResponse) {
    const user = await this.authService.validateUser(loginMemberUserDto)
    if (!user) throw new InvalidUserException()
    const tokens = await this.authService.login(user)
    res.cookie('access_token', tokens.access_token, { httpOnly: true })
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true })
    res.send()
  }

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body('refresh_token') token: string) {
    const storedTokenData = await this.authService.findRefreshToken(token)
    if (!storedTokenData || storedTokenData.isRevoked) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    const user = await this.userService.findUnique({ id: storedTokenData.userId })
    const newAccessToken = await this.authService.createToken(user)
    await this.authService.revokeRefreshToken(token)

    return {
      access_token: newAccessToken
    }
  }
}
