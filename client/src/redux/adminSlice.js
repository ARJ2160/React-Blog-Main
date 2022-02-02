import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    role: "user",
    loggedIn: false
}
let authMessages = ""

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdmin: () => {
            return {
                role: "admin",
                loggedIn: true
            }
        },
        setUser: () => {
            return {
                role: "user",
                loggedIn: true
            }
        },
        setLogStatus: () => {
            return {
                role: "user",
                loggedIn: false
            }
        }
    }
})

export const { setAdmin, setUser, setLogStatus } = adminSlice.actions
export default adminSlice.reducer
export const getAdminStatus = state => state.admin.role
export const isLoggedIn = state => state.admin.loggedIn
export { authMessages }