import userSlice from './user/userSlice'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
