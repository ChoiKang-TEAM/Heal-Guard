import { createSlice } from '@reduxjs/toolkit'

const initialState: string | null = null

const signUpSlice = createSlice({
  name: 'verification',
  initialState: {
    signUpUserInputData: initialState,
    status: 'idle',
    error: null,
    step: 1,
  },
  reducers: {
    goNextStep(state) {
      state.step += 1
    },
  },
})

export const { goNextStep } = signUpSlice.actions
export default signUpSlice
