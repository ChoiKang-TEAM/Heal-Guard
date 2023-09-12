import { createSlice } from '@reduxjs/toolkit'
import { authVerifyCodeCreate } from './verificationAction'
import { VerificationState } from 'src/types/type/signUpType'

const initialState: string | null = null

const verificationSlice = createSlice({
  name: 'verification',
  initialState: {
    verifyCode: initialState,
    status: 'idle',
    error: null,
  } as VerificationState,
  reducers: {
    clearVerifyCode: (state: VerificationState): void => {
      state.verifyCode = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authVerifyCodeCreate.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(authVerifyCodeCreate.fulfilled, (state, action) => {
        state.status = 'complete'
        if (action.payload.error) {
          state.error = action.payload.error
        }
        console.log(action)
      })
      .addCase(authVerifyCodeCreate.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { clearVerifyCode } = verificationSlice.actions
export default verificationSlice
