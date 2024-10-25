import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged: false,
  loggedUser: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginFunc: (state,action) => {
      state.logged =true
      state.loggedUser = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginFunc, incrementByAmount } = authSlice.actions

export default authSlice.reducer