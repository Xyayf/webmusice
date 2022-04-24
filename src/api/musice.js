import { service } from '../utill'
export const checkSong = (song) => service.get(`/check/music?id=${song.id}`)
// 获取歌词
export const getLyric = (id) => service.get(`/lyric?id=${id}`)
// 获取相似歌单
export const getSimiPlaylist = (id) => service.get(`/simi/playlist?id=${id}`)
// 获取相识歌曲
export const getSimiSong = (id) => service.get(`/simi/song?id=${id}`)
