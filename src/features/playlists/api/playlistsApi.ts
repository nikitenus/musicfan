import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistRequest,
} from "@/features/playlists/api/playlistsApi.types.ts"
import { baseApi } from "@/app/baseApi.ts"

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => ({ url: "/playlists", method: "GET" }),
      providesTags: ["Playlist"],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData[] }, CreatePlaylistArgs>({
      query: (body) => ({
        url: "/playlists",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Playlist"],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => ({
        url: `/playlists/${playlistId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Playlist"],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistRequest }>({
      query: ({ playlistId, body }) => ({
        url: `/playlists/${playlistId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Playlist"],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi
