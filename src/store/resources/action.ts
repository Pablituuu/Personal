import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Favorite, Recent, Resource, SearchResourceDto } from "~/interfaces/editor"
import * as api from "~/services/api"

export const setResources = createAction<Resource[] | null>("resources/setResources")
export const setListRecentResource = createAction<Recent[] | null>("resources/setListRecentResource")
export const setListFavoriteResources = createAction<Favorite[] | null>("resources/setListFavoriteResources")

export const getListResources = createAsyncThunk<void, SearchResourceDto, any>(
  "resource/getListResources",
  async (args, { dispatch }) => {
    try {
      const resources: any = await api.resourceSearch(args)
      dispatch(setResources(resources))
    } catch (err) {
      alert(err)
    }
  }
)

export const getListFavoriteResources = createAsyncThunk(
  "resources/getListFavoriteResources",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const favorites: any = await api.listFavoriteResource()
      dispatch(setListFavoriteResources(favorites))
    } catch (error) {
      console.log(error)
    }
  }
)

export const setRecentResource = createAsyncThunk<any, string, { rejectValue: void }>(
  "resources/getRecentResource",
  async (args) => {
    try {
      await api.recentResource(args)
    } catch (error) {
      console.log(error)
    }
  }
)

export const getFavoriteResource = createAsyncThunk<any, string, { rejectValue: void }>(
  "resources/getFavoriteResource",
  async (args) => {
    try {
      await api.favoriteResource(args)
    } catch (error) {}
  }
)

export const getListRecentResource = createAsyncThunk(
  "resources/getListRecentResources",
  async (args, { dispatch, rejectWithValue }) => {
    try {
      const recent: any = await api.listRecentResource()
      dispatch(setListRecentResource(recent))
    } catch (error) {
      console.log(error)
    }
  }
)
