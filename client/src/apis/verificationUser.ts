import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import getUerApi from 'src/apis/getUser'
import {
  ID_IN_USE_MESSAGE,
  VERIFICATION_ERROR_MESSAGE,
} from 'src/common/constants/messages'
import { VerificationResult } from 'src/types/type/signUpType'

const getAuthVerifyCodeByEmail = async (
  dto: AuthUserVerifyCodeByEmailInput
): Promise<VerificationResult> => {
  try {
    const isUsed = await getUerApi.isUsedUserId(dto.userId)
    if (isUsed) return { error: ID_IN_USE_MESSAGE }
    else return { code: '111111' }
  } catch (e) {
    console.error('Error while checking user Email: ', e)
    return { error: VERIFICATION_ERROR_MESSAGE }
  }
}

const verificationUserApi = {
  getAuthVerifyCodeByEmail,
}
export default verificationUserApi