import { useState } from 'react'
import verificationUserApi from 'src/apis/verificationUser'
import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import { VerificationState, VerifyCodeState } from 'src/types/interface/states'

const useEmailVerification = () => {
  const [field, setField] = useState<VerifyCodeState>({
    state: 'Idle',
    expiredTime: null,
  })
  const [inputCode, setInputCode] = useState<string>('')

  const handleFieldChange = (data: VerificationState) => {
    console.log(field)
    console.log(data)
  }

  const createVerifyCode = async (userId: string) => {
    const dto: AuthUserVerifyCodeByEmailInput = { userId }
    const { verificationState, expiredTime } =
      await verificationUserApi.getAuthVerifyCodeByEmail(dto)
    setField({ state: verificationState, expiredTime: expiredTime ?? null })
  }

  const state = {
    inputCode,
  }

  const action = {
    setField,
    setInputCode,
    handleFieldChange,
    createVerifyCode,
  }

  return {
    ...state,
    ...action,
  }
}

export default useEmailVerification
