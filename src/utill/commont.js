
// 全屏模式

export const isFullScreen = () => {
  return (document.fullscreenElement && document.fullscreenElement !== null) ||
    document.mozFullScreen || document.webkitIsFullScreen
}
export const requestFullscreen = (ele) => {
  const docElm = ele
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}

export const exitFullscreen = () => {
  const docElm = window.document
  if (docElm.exitFullscreen) {
    docElm.exitFullscreen()
  } else if (docElm.mozCancelFullScreen) {
    docElm.mozCancelFullScreen()
  } else if (docElm.webkitCancelFullScreen) {
    docElm.webkitCancelFullScreen()
  } else if (docElm.msExitFullscreen) {
    docElm.msExitFullscreen()
  }
}

// 判断某个dom是否在一个元素中或者在一个数组元素的元素中
export const isParent = (dom, parentArr) => {
  parentArr = Array.isArray(parentArr) ? parentArr : [...parentArr]
  while (dom) {
    if (parentArr.find(item => item === dom)) {
      return true
    } else {
      dom = dom.parentNode
    }
  }
}
// 使某元素滚动到可视区域
export function scrollInto (dom) {
  dom.scrollIntoView({ behavior: 'smooth' })
}
// 获取元素的宽度 margin+padding+border
export function getWidth (dom) {
  let computedStyle

  if (window.getComputedStyle) {
    computedStyle = getComputedStyle(dom, null)
  } else {
    computedStyle = dom.currentStyle// 兼容IE的写法
  }

  const width = Number.parseInt(computedStyle.marginLeft) + Number.parseInt(computedStyle.marginRight) + dom.offsetWidth
  return width
}
