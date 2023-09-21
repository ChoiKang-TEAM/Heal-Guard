import { VerificationStateType } from '../type/states'

export interface VerificationResult {
  verificationState: VerificationStateType
  expiredTime?: Date
}

export interface VerificationState {
  verifyCode?: string | null
  status?: string
  message?: string[]
  userId?: string
  error?: string
}

export interface VerifyCodeState {
  state: VerificationStateType
  expiredTime: Date | null
}
