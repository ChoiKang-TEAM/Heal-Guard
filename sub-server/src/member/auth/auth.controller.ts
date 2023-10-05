import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginMemberUserDto } from '../user/dto/user.input'
import { InvalidUserException } from 'src/shared/exceptions/invalid-user.exception'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginMemberUserDto: LoginMemberUserDto) {
    const user = await this.authService.validateUser(loginMemberUserDto)
    if (!user) throw new InvalidUserException()
  }
}
