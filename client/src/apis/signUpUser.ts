import axios from 'axios'
import { AuthUserVerifyCodeByEmailInput } from 'types/interface/sign-up/signUpInterface'

const getAuthVerifyCodeByEmail = async (
  params: AuthUserVerifyCodeByEmailInput
) => {
  const response = await isUsedUserId(params.userId)
  return response
}

const signUpUser = (params) => {
  try {
    const response = axios.post('api/sign-up')
    return response
  } catch (e) {
    console.error(e)
  }
}

const signUpUserApi = {
  getAuthVerifyCodeByEmail,
  signUpUser,
}
export default signUpUserApi
function isUsedUserId(userId: string) {
  throw new Error('Function not implemented.')
}
