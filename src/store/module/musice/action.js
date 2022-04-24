import { checkSong } from '../../../api/musice'
import { createInstance } from '@/components/confirm'
export default {
  async checkSong (context, song) {
    try {
      const res = await checkSong(song)
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async setCurrentSong (context, song) {
    if (song && song.id) {
      try {
        const { success, message } = await context.dispatch('checkSong', song)
        if (!success) {
          createInstance('提示', message)
        } else {
          context.commit('setCurrentSong', song)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
