import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Discovery = () => import(/* webpackChunkName: "Discovery" */ '@/page/discovery/index')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/page/playlists/index')
const Songs = () => import(/* webpackChunkName: "Songs" */ '@/page/songs/index')
const Mvs = () => import(/* webpackChunkName: "Mvs" */ '@/page/mvs/index')
export const menuRoutes = [

  // 发现音乐页面
  {
    path: '/discovery',
    component: Discovery,
    name: 'discovery',
    meta: {
      title: '发现音乐',
      icon: 'music'
    }

  },
  // 推荐歌单页面
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: {
      title: '推荐歌单',
      icon: 'playlist-menu'
    }
  },
  // 最新音乐页面
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: {
      title: '最新音乐',
      icon: 'yinyue'
    }
  },
  // 最新mv页面
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: {
      title: '最新Mv',
      icon: 'mv'

    }
  }

]

const router = new VueRouter({

  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    ...menuRoutes
  ]

})

export default router
