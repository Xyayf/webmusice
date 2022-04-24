/**
 * @param {number} num 需要向下取整的数字
 * @param {number} l 向下取几位
 * @returns number
 */
export const floor = (num, l) => {
  const f1 = Math.pow(10, l)
  return Math.floor(num * f1) / f1
}
export const percentNumber = (num) => {
  return floor(num, 5) * 100 + '%'
}
export function partArr (arr, num = 2) {
  const newArr = []
  for (let i = 0; i < num; i++) {
    newArr.push([])
  }
  const flag = Math.ceil(arr.length / num)
  for (let i = 0, j = 0; i < arr.length; i++) {
    const a = i % flag
    if (a === 0 && i > 0) {
      j++
    }
    newArr[j][a] = arr[i]
  }
  return newArr
}
