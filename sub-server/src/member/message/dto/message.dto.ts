import { IsString } from 'class-validator'

export class SendMailDto {
  to: string
  title: string
  content: string
}

export class MailState {}
