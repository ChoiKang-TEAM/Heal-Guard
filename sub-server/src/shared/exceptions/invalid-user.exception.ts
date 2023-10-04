import { HttpStatus } from '@nestjs/common'
import { BaseException } from './base.exception'

export class InvalidUserException extends BaseException {
  constructor() {
    super(2003, 'INVALID_USER', HttpStatus.UNAUTHORIZED)
  }
}
