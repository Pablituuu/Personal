import { ChangePasswordDto, User, userInterface, UserMe } from "~/interfaces/user"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import * as api from "~/services/api"
import { SigninDto, SignupDto } from "~/interfaces/user"

export const setUser = createAction<User>("user/setUser")
export const removeUser = createAction<void>("user/setremoveUser")
export const setUserMe = createAction<UserMe>("user/setUserMe")
export const setUpdateProfile = createAction<boolean>("user/setupdateProfile")

export const changePassword = createAsyncThunk<any, ChangePasswordDto, { rejectValue: void }>(
  "user/changePassword",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const user = await api.changePassword(args)
      return true
    } catch (err) {
      return rejectWithValue
    }
  }
)

export const userMe = createAsyncThunk<void, never, any>(
  "uploads/getUploads",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setUserMe(await api.userMe()))
    } catch (err) {
      alert(err)
    }
  }
)

export const signin = createAsyncThunk<any, SigninDto, { rejectValue: boolean }>(
  "user/signin",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const user = await api.signin(args)
      dispatch(setUser(user))
      return true
    } catch (err) {
      return rejectWithValue(false)
    }
  }
)

export const signup = createAsyncThunk<any, SignupDto, { rejectValue: boolean }>(
  "user/signup",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      await api.signup(args)
      const signIn: SigninDto = { email: args.email, password: args.password }
      const user = await api.signin(signIn)
      dispatch(setUser(user))
      return true
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const logout = createAsyncThunk<any, void, { rejectValue: boolean }>(
  "user/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.logout()
      dispatch(removeUser())
      return true
    } catch (error) {
      return rejectWithValue(false)
    }
  }
)

export const updateProfile = createAsyncThunk<any, userInterface, { rejectValue: Record<string, string[]> }>(
  "user/updateProfile",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const user = await api.getUpdateUser(args)
      if (user) {
        dispatch(setUpdateProfile(true))
      }
      return true
    } catch (err) {}
  }
)
