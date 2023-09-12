export interface AuthUserVerifyCodeByEmailInput {
  userId: string
}

export interface AuthVerifyCode {
  verifyCode: string
}

export interface SignUpUserInput {
  userId: string
  password: string
}
