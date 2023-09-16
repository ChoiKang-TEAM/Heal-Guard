import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: null,
  password: null,
  usedPillList: [],
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
