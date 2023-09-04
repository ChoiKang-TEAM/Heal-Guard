import { combineReducers } from 'redux'
import userSlice from './user/userSlice'

const rootReducer = combineReducers({
  userReducer: userSlice.reducer,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
