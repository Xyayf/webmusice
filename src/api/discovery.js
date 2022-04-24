import { request } from '@/utill/request'
export const getBanner = () => request.get('/banner?type=0')
export const getNewPlaylist = (limit = 10) => request.get('/personalized', { params: { limit } })
export const getNewSongs = (limit) => request.get('/personalized/newsong', { params: { limit } })
export const getNewMvs = () => request.get('/personalized/mv')
