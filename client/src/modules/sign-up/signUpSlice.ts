import { createSlice } from '@reduxjs/toolkit'
import { SignUpUserInput } from 'src/types/interface/sign-up/signUpInterface'

const initialState: SignUpUserInput = {
  userId: null,
  password: null,
}

const signUpSlice = createSlice({
  name: 'verification',
  initialState: {
    signUpUserInputData: initialState,
    step: 1,
  },
  reducers: {
    setUserId(state, action) {
      state.signUpUserInputData.userId = action.payload
    },
    goNextStep(state, action) {
      state.step += action.payload
    },
  },
})

export const { goNextStep, setUserId } = signUpSlice.actions
export default signUpSlice
