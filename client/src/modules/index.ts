import { combineReducers } from 'redux'
import userSlice from './user/userSlice'
import verificationSlice from './sign-up/verificationSlice'

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
  verificationReducer: verificationSlice.reducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
