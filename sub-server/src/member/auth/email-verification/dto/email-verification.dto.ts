export class SendMailDto {
  userId: string
}

export class ConfirmVerifyCodeDto extends SendMailDto {
  verifyCode: string
}
