import { useState } from 'react'
import verificationUserApi from 'src/apis/verificationUser'
import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import { VerificationState } from 'src/types/interface/states'

const useEmailVerification = () => {
  const [field, setField] = useState({
    verifyCode: null,
    message: null,
    state: 'idle',
    userId: null,
  })
  const [inputCode, setInputCode] = useState<string>('')

  const handleFieldChange = (data: VerificationState) => {
    console.log(field)
    console.log(data)
  }

  const createVerifyCode = async (userId: string) => {
    const dto: AuthUserVerifyCodeByEmailInput = { userId }
    const createVerifyCodeData =
      await verificationUserApi.getAuthVerifyCodeByEmail(dto)

    const data: VerificationState = {
      verifyCode: createVerifyCodeData ?? '',
    }
    console.log(data)
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
