import { IsIn, IsString } from 'class-validator'

type MailType = 'verification'

export class SendMailDto {
  @IsIn(['verification'])
  mailType: MailType
}

export class MailState {
  @IsString()
  to: string

  @IsString()
  title: string

  @IsString()
  content: string
}
