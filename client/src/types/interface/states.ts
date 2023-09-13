import { VerificationStatusType } from '../type/states'

export interface VerificationState {
  verifyCode?: string | null
  status: VerificationStatusType
  message: string[]
}
