export const isLogin = state => {
  return !!state.profile
}
export const proPlalist = state => {
  const { profile, playlist } = state
  const { userId } = profile
  const createPlaylist = []
  const collectPlaylist = []
  const newPlaylist = []
  playlist.forEach((item) => {
    if (item.userId === userId) {
      createPlaylist.push(item)
    } else {
      collectPlaylist.push(item)
    }
  })
  function makeTochildere (playlist) {
    return playlist.map(item => {
      const { id, name } = item
      return {
        path: `/playlist/${id}`,
        meta: {
          title: name,
          icon: 'playlist-menu'
        }
      }
    })
  }
  if (createPlaylist.length) {
    newPlaylist.push({
      type: 'playlist',
      title: '创建的歌单',
      children: makeTochildere(createPlaylist)
    })
  }
  if (collectPlaylist.length) {
    newPlaylist.push({
      type: 'playlist',
      title: '收藏的歌单',
      children: makeTochildere(collectPlaylist)
    })
  }
  return newPlaylist
}
