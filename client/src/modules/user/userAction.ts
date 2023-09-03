import { getUser } from 'apis/get-user'
import { User } from 'common/interfaces/users/user'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const loginUser = createAsyncThunk(
  'users/fetch',
  async (loginDto: User) => {
    const response = await getUser(loginDto)
    return response
  }
)

const initialState: User = {
  userId: '',
  BUDI: '',
  gender: '',
  password: '',
}

const decode = (token: string): User => {
  token
  return {
    userId: 'as',
    password: 'as',
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: initialState, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'complete'

        state.user = decode(action.payload || '')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
