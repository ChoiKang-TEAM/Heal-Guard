import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import getUerApi from 'src/apis/getUser'
import { VerificationResult } from 'src/types/interface/states'
import axios from 'axios'

const getAuthVerifyCodeByEmail = async (
  dto: AuthUserVerifyCodeByEmailInput
): Promise<VerificationResult> => {
  try {
    const isUsed = await getUerApi.isUsedUserId(dto.userId)
    const response = await axios.get('/api/create/code')
    if (response.data.code === '1000')
      return {
        verificationState: 'Created',
        expiredTime: response.data.expiredTime,
      }
    else return { verificationState: 'Error' }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error('네트워크 통신 오류', e)
    if (e.response.data.code === '2003') return { verificationState: 'InUse' }
    else return { verificationState: 'Error' }
  }
}

const verificationUserApi = {
  getAuthVerifyCodeByEmail,
}
export default verificationUserApi
