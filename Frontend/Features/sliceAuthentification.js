import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userName: "",
}


export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        name: (state,action) => {
            state.userName = action.payload
        }
    },
})

export const { name } = userSlice.actions;
export default userSlice.reducer