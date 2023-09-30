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
        code: string
        result: {
          expiredTime: Date
        }
      }
    } = await axios.get('/api/create/code') // TODO: POST 요청으로 변경해야함
    const { code, result } = response.data
    if (code === '1000')
      return {
        verificationState: 'Created',
        expiredTime: result.expiredTime,
      }
    else return { verificationState: 'Error' }
  } catch (e: any) {
    if (e?.response?.code === '2003') return { verificationState: 'InUse' }
    else return { verificationState: 'Error' }
  }
}

const getConfirmVerifyCode = async (
  params: AuthVerifyCode
): Promise<VerificationResult> => {
  try {
    const response = await axios.post('/api/confirm/code', params)
    if (response.data.code === '1000')
      return {
        verificationState: 'Authentication',
      }
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
