import verificationUserApi from 'src/apis/verificationUser'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthUserVerifyCodeByEmailInput } from 'src/types/interface/sign-up/signUpInterface'

export const authVerifyCodeCreate = createAsyncThunk(
  'auth/emailVerify',
  async (dto: AuthUserVerifyCodeByEmailInput) => {
    const res = await verificationUserApi.getAuthVerifyCodeByEmail(dto)
    return res
  }
)
