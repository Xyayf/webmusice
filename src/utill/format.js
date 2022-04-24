export function formatTime (time) {
  time = parseInt(time)
  const m = (time / 60).toFixed().padStart(2, '0')
  const s = (time % 60).toFixed().padStart(2, '0')
  return `${m}:${s}`
}
// function formatime (time) {
//   const m = (time / 60) | 0
//   const s = (time % 60) | 0
//   return `${m}:${s}`
// }
export function formatTimes (date, frm = 'yyyy-MM-dd hh:mm:ss') {
  date = date instanceof Date ? date : new Date(date)
  const o = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    const str = o[k] + ''
    if (new RegExp(`(${k})`).test(frm)) {
      frm = frm.replace(RegExp.$1,
        str.length >= 2 ? str : str.padStart(2, 0)
      )
    }
  }
  return frm
}
export function fixPadStart (len, num) {
  return num.toFixed().padStart(len, '0')
}
