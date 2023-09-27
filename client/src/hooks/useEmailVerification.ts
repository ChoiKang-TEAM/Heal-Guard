import verificationUserApi from 'src/apis/verificationUser'
import { useState } from 'react'
import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import { VerifyCodeState } from 'src/types/interface/states'

const useEmailVerification = () => {
  const [field, setField] = useState<VerifyCodeState>({
    state: 'Idle',
    expiredTime: null,
  })
  const [inputCode, setInputCode] = useState<string>('')

  const createVerifyCode = async (userId: string) => {
    const dto: AuthUserVerifyCodeByEmailInput = { userId }
    const { verificationState, expiredTime } =
      await verificationUserApi.getAuthVerifyCodeByEmail(dto)
    setField({ state: verificationState, expiredTime: expiredTime ?? null })
  }

  const state = {
    inputCode,
    field,
  }

  const action = {
    setField,
    setInputCode,
    createVerifyCode,
  }

  return {
    ...state,
    ...action,
  }
}

export default useEmailVerification
