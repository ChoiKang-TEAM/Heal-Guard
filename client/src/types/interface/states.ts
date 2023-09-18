import { VerificationStateType } from '../type/states'

export type VerificationResult = {
  verifyCode?: string
  verificationState: VerificationStateType
}

export type VerificationState = {
  verifyCode?: string | null
  status?: string
  message?: string[]
  userId?: string
  error?: string
}
