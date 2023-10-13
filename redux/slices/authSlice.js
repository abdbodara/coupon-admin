import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {},
    token: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
            state.token = action.payload.token ? action.payload.token : ""
        }
    },
})

export const { setUserInfo } = authSlice.actions

export default authSlice.reducer