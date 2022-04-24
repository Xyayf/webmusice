import { randomArr } from '@/utill/music'
import { MOD_EMAP } from '@/config/const'
export const hasCurrentSong = (state) => {
  return !!state.currentSong.id
}

export const Playlist = (state) => {
  const { playList, playMode } = state
  if (MOD_EMAP[playMode] === 'SEQUENCE') {
    return playList
  } else if (MOD_EMAP[playMode] === 'LOOP') {
    return playList
  } else if (MOD_EMAP[playMode] === 'RANDOM') {
    return randomArr(playList, 'id')
  }
}
function getNextIndex (playMode, index, len) {
  if (MOD_EMAP[playMode] === 'SEQUENCE') {
    return (index + 1) % len
  } else if (MOD_EMAP[playMode] === 'LOOP') {
    return (index + 1) % len
  } else if (MOD_EMAP[playMode] === 'RANDOM') {
    return (index + 1) % len
  }
}
function getPrevIndex (playMode, index, len) {
  if (MOD_EMAP[playMode] === 'SEQUENCE') {
    return (index - 1) < 0 ? 0 : index - 1
  } else if (MOD_EMAP[playMode] === 'LOOP') {
    return (index - 1) < 0 ? 0 : index - 1
  } else if (MOD_EMAP[playMode] === 'RANDOM') {
    return (index - 1) < 0 ? 0 : index - 1
  }
}
export const nextSong = (state, getters) => {
  const { Playlist } = getters
  const { playMode, currentSong } = state
  const index = Playlist.findIndex(item => item.id === currentSong.id)
  const nextIndex = getNextIndex(playMode, index, Playlist.length)
  return Playlist[nextIndex]
}
export const prevSong = (state, getters) => {
  const { Playlist } = getters
  const { playMode, currentSong } = state
  const index = Playlist.findIndex(item => item.id === currentSong.id)
  const prevIndex = getPrevIndex(playMode, index)
  return Playlist[prevIndex]
}
