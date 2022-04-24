import { request } from '../utill'
export const getPlaylists = (params) => request.get('/top/playlist', { params })
export const getTopPlaylists = (params) => request.get('/top/playlist/highquality', { params })
