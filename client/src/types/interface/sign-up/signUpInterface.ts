export interface AuthUserVerifyCodeByEmailInput {
  userId: string
}

export interface AuthVerifyCode extends AuthUserVerifyCodeByEmailInput {
  verifyCode: string
}

export interface SignUpUserInput {
  userId: string | null
  password: string | null
}
