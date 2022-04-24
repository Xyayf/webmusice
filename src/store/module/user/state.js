import { getItem } from '@/utill/localstorage'
import { PROFILE, TOKEN, PLAYLIST } from '@/config/const'
export default {
  profile: getItem(PROFILE) || null,
  token: getItem(TOKEN) || '',
  playlist: getItem(PLAYLIST) || []

}
