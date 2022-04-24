import { setItem, removeItem } from '@/utill/localstorage'
import { PROFILE, TOKEN, PLAYLIST } from '@/config/const'
export default {
  setProfile (state, profile) {
    state.profile = profile
    setItem(PROFILE, profile)
  },
  setToken (state, token) {
    state.token = token
    setItem(TOKEN, token)
  },
  setPlaylist (state, playlist) {
    state.playlist = playlist
    setItem(PLAYLIST, playlist)
  },
  removeProfile (state) {
    state.profile = null
    removeItem(PROFILE)
  },
  removeToken (state) {
    state.token = ''
    removeItem(TOKEN)
  },
  removePlaylist (state) {
    state.playlist = []
    removeItem(PLAYLIST)
  }
}
