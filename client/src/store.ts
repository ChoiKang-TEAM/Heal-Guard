import { configureStore } from '@reduxjs/toolkit'
import rootReducer from 'modules/index'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const store = configureStore({ reducer: rootReducer })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
export default store
