import { IsIn, IsNotEmpty, IsString } from 'class-validator'

type MailType = 'verification'

export class SendMailDto {
  @IsString()
  @IsNotEmpty()
  to: string

  @IsString()
  title: string

  @IsString()
  content: string

  @IsIn(['verification'])
  mailType: MailType
}
