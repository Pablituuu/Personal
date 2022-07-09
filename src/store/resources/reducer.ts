import { createReducer } from "@reduxjs/toolkit"
import { Favorite, Recent, Resource } from "~/interfaces/editor"
import { setListFavoriteResources, setListRecentResource, setResources } from "./action"

export interface RecentResourcesState {
  recentResources: Recent[] | null
}

const recentInitialState: RecentResourcesState = {
  recentResources: []
}

export const recentResourcesReducer = createReducer(recentInitialState, (builder) => {
  builder.addCase(setListRecentResource, (state, { payload }) => {
    state.recentResources = payload
  })
})

export interface ListFavoriteResourcesState {
  listFavoriteResources: Favorite[] | null
}

const listFavoriteResourcesState: ListFavoriteResourcesState = {
  listFavoriteResources: []
}

export const listFavoriteResourcesReducer = createReducer(listFavoriteResourcesState, (builder) => {
  builder.addCase(setListFavoriteResources, (state, { payload }) => {
    state.listFavoriteResources = payload
  })
})

export interface ResourcesState {
  resources: Resource[] | null
}

const initialState: ResourcesState = {
  resources: []
}

export const resourcesReducer = createReducer(initialState, (builder) => {
  builder.addCase(setResources, (state, { payload }) => {
    state.resources = payload
  })
})
