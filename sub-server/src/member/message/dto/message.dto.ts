import { IsIn, IsString } from 'class-validator'

type MailType = 'verification'

export class SendMailDto {
  @IsString()
  to: string

  @IsString()
  title: string

  @IsString()
  content: string

  @IsIn(['verification'])
  mailType: MailType
}
