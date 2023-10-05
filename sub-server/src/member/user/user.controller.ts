import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { JoinMemberUser } from './dto/user.input'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  async join(@Body() joinMemberUser: JoinMemberUser): Promise<boolean> {
    return this.userService.create(joinMemberUser)
  }
}
