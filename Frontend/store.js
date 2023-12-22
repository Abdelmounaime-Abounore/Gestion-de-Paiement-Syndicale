import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Features/sliceAuthentification'

export const store = configureStore({
  reducer: {
    User: userSlice.reducer
  },
})