import { Body, Controller, Post, Response } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginMemberUserDto } from '../user/dto/user.input'
import { InvalidUserException } from 'src/shared/exceptions/invalid-user.exception'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginMemberUserDto: LoginMemberUserDto, @Response() res: any) {
    const user = await this.authService.validateUser(loginMemberUserDto)
    if (!user) throw new InvalidUserException()
    const tokens = await this.authService.login(user)
    res.cookie('access_token', tokens.access_token, { httpOnly: true })
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true })
    return res.status(200).send()
  }
}
