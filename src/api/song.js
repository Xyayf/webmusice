import { request } from '../utill'
export const getTopSongs = type => request.get(`/top/song?type=${type}`)
