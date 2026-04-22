import { useDeletePlaylistMutation, useFetchPlaylistsQuery } from "@/features/playlists/api/playlistsApi.ts"
import s from "./PlaylistsPage.module.css"
import { CreatePlaylistForm } from "./CreatePlaylistForm/CreatePlaylistForm"
import { type ChangeEvent, useState } from "react"
import type { PlaylistData, UpdatePlaylistArgs } from "@/features/playlists/api/playlistsApi.types.ts"
import { useForm } from "react-hook-form"
import { PlaylistItem } from "@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem.tsx"
import { EditPlaylistForm } from "@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm.tsx"
import { useDebounceValue } from "@/common/hooks"
import { Pagination } from "@/common/components/Pagination/Pagination.tsx"

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null)
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)

  const debounceSearch = useDebounceValue(search)
  const { data, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch, pageNumber: currentPage, pageSize })

  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      })
    } else {
      setPlaylistId(null)
    }
  }

  const changePageSizeHandler = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value)
    setCurrentPage(1)
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={"Search playlist by title"}
        onChange={searchPlaylistHandler}
      />
      <div className={s.items}>
        {!data?.data.length && !isLoading && <h2>Playlists not found</h2>}
        {data?.data.map((playlist) => {
          const isEditing = playlistId === playlist.id

          return (
            <div
              className={s.item}
              key={playlist.id}
            >
              {isEditing ? (
                <EditPlaylistForm
                  editPlaylist={editPlaylistHandler}
                  playlistId={playlist.id}
                  setPlaylistId={setPlaylistId}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <PlaylistItem
                  deletePlaylist={deletePlaylistHandler}
                  playlist={playlist}
                  editPlaylist={editPlaylistHandler}
                />
              )}
            </div>
          )
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={data?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={changePageSizeHandler}
      />
    </div>
  )
}
