import { createSlice } from '@reduxjs/toolkit'
import { SignUpUserInput } from 'src/types/interface/sign-up/signUpInterface'

const initialState: SignUpUserInput = {
  userId: null,
  password: null,
  usePillList: [],
}

const signUpSlice = createSlice({
  name: 'verification',
  initialState: {
    signUpUserInputData: initialState,
    status: 'idle',
    error: null,
    step: 1,
  },
  reducers: {
    goNextStep(state, action) {
      state.step += action.payload
    },
  },
})

export const { goNextStep } = signUpSlice.actions
export default signUpSlice
