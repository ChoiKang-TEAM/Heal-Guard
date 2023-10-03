import {
  AuthUserVerifyCodeByEmailInput,
  AuthVerifyCode,
} from 'src/types/interface/sign-up/signUpInterface'
import { VerificationResult } from 'src/types/interface/states'
import axios from 'axios'

const getAuthVerifyCodeByEmail = async (
  params: AuthUserVerifyCodeByEmailInput
): Promise<VerificationResult> => {
  try {
    const response: {
      data: {
        code: number
        result: {
          validTime: Date
        }
      }
    } = await axios.post('/api/email/verification/send', params)
    const { code, result } = response.data
    if (code === 1000)
      return {
        verificationState: 'Created',
        validTime: result.validTime,
      }
    else return { verificationState: 'Error' }
  } catch (e: any) {
    if (e?.response?.data?.code === 3000) return { verificationState: 'InUse' }
    else return { verificationState: 'Error' }
  }
}

const getConfirmVerifyCode = async (
  params: AuthVerifyCode
): Promise<VerificationResult> => {
  try {
    const response: {
      data: {
        code: number
      }
    } = await axios.post('/api/email/verification/confirm', params)
    if (response.data.code === 1000)
      return {
        verificationState: 'Authentication',
      }
    else if (response.data.code === 3001)
      return { verificationState: 'Mismatched' }
    else return { verificationState: 'Error' }
  } catch (e: any) {
    if (e?.response?.code === '2000') return { verificationState: 'Mismatched' }
    else if (e?.response?.code === '2001')
      return { verificationState: 'Expired' }
    else return { verificationState: 'Error' }
  }
}

const verificationUserApi = {
  getAuthVerifyCodeByEmail,
  getConfirmVerifyCode,
}
export default verificationUserApi
