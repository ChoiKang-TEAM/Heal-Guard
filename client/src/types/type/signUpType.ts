export type VerificationResult = {
  code?: string
  error?: string
}

export type VerificationState = {
  verifyCode: string | null
  status: string
  error: string | null
}
