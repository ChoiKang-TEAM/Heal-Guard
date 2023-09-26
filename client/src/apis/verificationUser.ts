import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import { VerificationResult } from 'src/types/interface/states'
import axios from 'axios'

const getAuthVerifyCodeByEmail = async (
  dto: AuthUserVerifyCodeByEmailInput
): Promise<VerificationResult> => {
  try {
    const response = await axios.get('/api/create/code')
    if (response.data.code === '1000')
      return {
        verificationState: 'Created',
        expiredTime: response.data.expiredTime,
      }
    else return { verificationState: 'Error' }
  } catch (e: any) {
    if (e?.response?.code === '2003') return { verificationState: 'InUse' }
    else return { verificationState: 'Error' }
  }
}

const verificationUserApi = {
  getAuthVerifyCodeByEmail,
}
export default verificationUserApi
