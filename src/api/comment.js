import { service } from '../utill'
// 获取歌曲评论
export const getSongcomment = (params) => {
  return service.get('/comment/music', { params })
}
// 获取歌单评论
export const getPlayListComment = (params) => service.get('/comment/playlist', { params })
// 获取热门评论
export const getHotComment = (params) => service.get('/comment/hot', { params })
export const getMvComment = (params) => service.get('/comment/mv', { params })
