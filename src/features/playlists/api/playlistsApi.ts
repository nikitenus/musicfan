import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistRequest,
} from "@/features/playlists/api/playlistsApi.types.ts"

export const playlistsApi = createApi({
  reducerPath: "playlistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({ url: "/playlists", method: "GET" }),
    }),
    createPlaylist: build.mutation<{ data: PlaylistData[] }, CreatePlaylistArgs>({
      query: (body) => ({
        url: "/playlists",
        method: "POST",
        body,
      }),
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `/playlists/${playlistId}`,
        method: "DELETE",
      }),
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistRequest }>({
      query: ({ playlistId, body }) => ({
        url: `/playlists/${playlistId}`,
        method: "PUT",
        body,
      }),
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi
