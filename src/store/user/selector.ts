import { RootState } from "../store"

export const selectUser = (state: RootState) => state.user.user
export const selectUserMe = (state: RootState) => state
export const selectUpdateProfile = (state: RootState) => state
