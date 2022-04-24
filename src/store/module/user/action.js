import { loginApi, loginOutApi, getPlaylists } from '@/api/user'

export default {
  async login (context, info) {
    try {
      const res = await loginApi(info.phone, info.password)
      context.dispatch('getPlaylist', res.profile.userId)
      context.commit('setProfile', res.profile)
      context.commit('setToken', res.token)
      return res
    } catch (err) {
      console.log(err)
    }
  },
  async loginOut (context) {
    try {
      const res = await loginOutApi()
      context.commit('removeProfile')
      context.commit('removeToken')
      context.commit('removePlaylist')
      console.log('退出登录')
      return res
    } catch (err) {
      console.log(err)
    }
  },
  async getPlaylist (context, uid) {
    try {
      const res = await getPlaylists(uid)
      context.commit('setPlaylist', res.playlist)
    } catch (err) {
      console.log(err)
    }
  }
}
