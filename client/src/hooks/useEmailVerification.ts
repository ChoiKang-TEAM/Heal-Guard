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
    const { verificationState, validTime } =
      await verificationUserApi.getAuthVerifyCodeByEmail(dto)
    setField({ state: verificationState, expiredTime: validTime ?? null })
  }

  const confirmVerifyCode = async (userId: string) => {
    const params = { userId: userId, verifyCode: inputCode }
    const { verificationState } =
      await verificationUserApi.getConfirmVerifyCode(params)
    setField({ state: verificationState, expiredTime: field.expiredTime })
  }

  const state = {
    inputCode,
    field,
  }

  const action = {
    setField,
    setInputCode,
    createVerifyCode,
    confirmVerifyCode,
  }

  return {
    ...state,
    ...action,
  }
}

export default useEmailVerification
