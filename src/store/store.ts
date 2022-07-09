import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { resourcesReducer } from "./resources/reducer"
import { userReducer } from "./user/reducer"

const usersPersistConfig = {
  key: "user",
  storage
}

const persistedReducer = combineReducers({
  user: persistReducer(usersPersistConfig, userReducer),
  resources: resourcesReducer
})

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
  })
}

const store = makeStore()
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export default store
