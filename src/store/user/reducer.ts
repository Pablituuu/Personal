import { Drawifier, User, UserMe } from "~/interfaces/user"
import { createReducer } from "@reduxjs/toolkit"
import { removeUser, setUser, setUserMe, setUpdateProfile } from "./action"

export interface UserState {
  user: User | Drawifier | null
}

const initialState: UserState = {
  user: null
}

interface UpdateProfileState {
  update: boolean | null
}

const initialUpdateProfileState: UpdateProfileState = {
  update: null
}

interface SetUserMe {
  userMe: UserMe | null
}

const initialUserMe: SetUserMe = {
  userMe: null
}

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, { payload }) => {
    state.user = payload
  })
  builder.addCase(removeUser, (state) => {
    state.user = null
  })
})

export const updateProfileReducer = createReducer(initialUpdateProfileState, (builder) => {
  builder.addCase(setUpdateProfile, (state, { payload }) => {
    state.update = payload
  })
})

export const userMeReducer = createReducer(initialUserMe, (builder) => {
  builder.addCase(setUserMe, (state, { payload }) => {
    state.userMe = payload
  })
})
