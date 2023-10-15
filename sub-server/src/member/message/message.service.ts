import { Injectable } from '@nestjs/common'
import * as nodeMailer from 'nodemailer'

@Injectable()
export class MessageService {
  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const transport = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_MAIL_USERID,
        pass: process.env.AUTH_MAIL_PASSWORD
      }
    })

    const mailOptions = {
      to,
      subject,
      html
    }

    await transport.sendMail(mailOptions)
  }
}
