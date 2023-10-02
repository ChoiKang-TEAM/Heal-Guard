import verificationUserApi from 'src/apis/verificationUser'
import { useState } from 'react'
import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'
import { VerifyCodeState } from 'src/types/interface/states'
import { handleTimeDifference } from 'src/utils/handlers/dataChangeHandler'
import { useTimer } from './useInterval'

const useEmailVerification = () => {
  const [field, setField] = useState<VerifyCodeState>({
    state: 'Idle',
  })
  const [inputCode, setInputCode] = useState<string>('')
  const expiredTimer = () => {
    setField({
      state: 'Expired',
    })
  }
  const { minutes, seconds, startTimer, resetTimer } = useTimer(expiredTimer)
  const handleSetInputCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(event.target.value)
  }

  const resetField = () => {
    setField({
      state: 'Idle',
    })
  }

  const resetInputCode = () => {
    setInputCode('')
  }

  const createVerifyCode = async (userId: string) => {
    const dto: AuthUserVerifyCodeByEmailInput = { userId }
    const { verificationState, validTime } =
      await verificationUserApi.getAuthVerifyCodeByEmail(dto)
    setField({ state: verificationState })
    if (verificationState === 'Created') {
      const { minutes, seconds } = handleTimeDifference(validTime)
      resetTimer()
      return startTimer(minutes, seconds)
    } else return
  }

  const confirmVerifyCode = async (userId: string) => {
    const params = { userId: userId, verifyCode: inputCode }
    const { verificationState } =
      await verificationUserApi.getConfirmVerifyCode(params)
    setField({ state: verificationState })
  }

  const state = {
    inputCode,
    field,
    minutes,
    seconds,
  }

  const action = {
    setField,
    resetField,
    resetInputCode,
    handleSetInputCode,
    createVerifyCode,
    confirmVerifyCode,
  }

  return {
    ...state,
    ...action,
  }
}

export default useEmailVerification
