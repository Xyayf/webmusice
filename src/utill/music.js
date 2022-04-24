
export const joinArtistis = (Artistis) => Artistis.map(item => item.name).join('/')
export const getPlayerUrl = (id) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`
export const normalizedSong = (song) => {
  const { id, artists, mvid: mvId, name, duration, album: { id: albumId, name: albumName, picUrl } } = song
  return {
    id,
    name,
    url: getPlayerUrl(id),
    album: { albumId, albumName },
    artists: joinArtistis(artists),
    mvId,
    duration: duration / 1000,
    picUrl
  }
}
// 处理字符串歌词 “[00:00.000] 作词 : 阿信\n[00:01.000] 作曲 : 阿信\n”
export const timeLyric = (lyric) => {
  const lyrObj = []
  const lyrArr = lyric.split('\n')
  lyrArr.forEach(lyrArrItem => {
    if (lyrArrItem) {
      const lyric = decodeURIComponent(lyrArrItem)
      const itemArr = lyric.split(']')
      const lyc = itemArr.pop()
      const times = itemArr[0].slice(1)
      const timeArr = times.split(':')
      const time = timeArr[0] * 60 + timeArr[1].slice(0, 2) * 1

      if (lyc) {
        lyrObj.push({
          time,
          lyc
        })
      }
    }
  })
  return lyrObj
}
export function normalizeCommet (result) {
  if (!result) return
  return result.map(item => {
    const { content, beReplied, user: { nickname, avatarUrl }, timeStr, time, likedCount } = item

    return {

      nickname,
      avatarUrl,
      content,
      timeStr,
      time,
      likedCount,
      beReplied: normalizeCommet(beReplied)

    }
  })
}
// 获取偏移量offset
export function getPageOffset (page, limit) {
  return (page - 1) * limit
}
// 获取随机数组
export function randomArr (arr, type) {
  const newArr = []
  let randomIndex
  if (Object.prototype.toString.call({}).slice(8).includes('Object')) {
    while (newArr.length < arr.length) {
      randomIndex = Math.floor(Math.random() * arr.length)
      if (!(newArr.find(item => item[type] === arr[randomIndex][type]))) {
        newArr.push(arr[randomIndex])
      }
    }
  } else {
    while (newArr.length < arr.length) {
      randomIndex = Math.floor(Math.random() * arr.length)
      if (!(newArr.find(item => item === arr[randomIndex]))) {
        newArr.push(arr[randomIndex])
      }
    }
  }
  return newArr
};
export function deteDateType (obj) {
  const type = Object.prototype.toString.call(obj)
  return type.slice(8, type.length - 1)
}
export function partArrtsProp (songTableArrt, ElTableprop) {
  const props = {}
  const arrts = {}
  Object.keys(songTableArrt).forEach(key => {
    const value = songTableArrt[key]
    if (Object.prototype.hasOwnProperty.call(ElTableprop, key)) {
      props[key] = value
    } else {
      arrts[key] = value
    }
  })
  return { props, arrts }
}
