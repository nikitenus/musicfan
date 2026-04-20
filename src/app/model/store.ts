import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { playlistsApi } from "@/features/playlists/api/playlistsApi.ts"
import { baseApi } from "@/app/baseApi.ts"

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: playlistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)
