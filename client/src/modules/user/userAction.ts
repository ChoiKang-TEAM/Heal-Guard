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

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succe'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default userSlice.reducer
