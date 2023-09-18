export type VerificationResult = {
  verifyCode?: string
  error?: string
}

export type VerificationState = {
  verifyCode?: string | null
  status?: string
  message?: string[]
  userId?: string
  error?: string
}
