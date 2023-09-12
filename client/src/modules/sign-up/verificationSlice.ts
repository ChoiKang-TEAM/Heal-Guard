import { createSlice } from '@reduxjs/toolkit'

const initialState: string | null = null

const verificationSlice = createSlice({
  name: 'verification',
  initialState: { verifyCode: initialState, status: 'idle', error: null },
  reducers: {
    clearVerifyCode: (state: {
      verifyCode: string | null
      status: string
      error: string | null
    }): void => {
      state.verifyCode = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'complete'
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export const { clearVerifyCode } = verificationSlice.actions
export default verificationSlice
