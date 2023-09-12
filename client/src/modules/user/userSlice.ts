import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginUser } from './userAction'
import { User } from 'src/types/interface/user/userInterface'

const initialState: User = {
  userId: '',
  password: '',
}

const setTokenHelper = (token: string) => {
  console.log(1)
  localStorage.setItem('token', token)
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: initialState, status: 'idle', error: null },
  reducers: {
    setToken: (state, action: PayloadAction<{ token: string }>): void => {
      setTokenHelper(action.payload.token)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'complete'
        if (action.payload.token) {
          state.user = action.payload.user
          setTokenHelper(action.payload.token)
          state.user.status = '로그인 성공!'
        } else {
          state.user = action.payload.user
          state.user.status = '로그인 실패!'
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed'
      })
  },
})

export default userSlice
