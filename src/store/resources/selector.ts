import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store"

const ResourcesList = (state: RootState) => state.resources.resources

export const selectResourceList = createSelector(ResourcesList, (state) => state)
