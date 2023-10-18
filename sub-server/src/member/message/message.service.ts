import { Injectable } from '@nestjs/common'
import * as nodeMailer from 'nodemailer'
import { SendMailDto } from './dto/message.dto'
import Mail from 'nodemailer/lib/mailer'

@Injectable()
export class MessageService {
  async sendMail(dto: SendMailDto): Promise<void> {
    const transport = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_MAIL_USERID,
        pass: process.env.AUTH_MAIL_PASSWORD
      }
    })

    const mailOptions: Mail.Options = {
      to: dto.to,
      subject: dto.title,
      html: dto.content
    }

    await transport.sendMail(mailOptions)
  }
}
