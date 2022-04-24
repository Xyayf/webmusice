import Vue from 'vue'
import Vuex from 'vuex'
import theme from '@/store/module/theme.js'
import user from '@/store/module/user/index.js'
import musice from '@/store/module/musice/index.js'

Vue.use(Vuex)
export default new Vuex.Store({
  // 全局注册
  getters: {
    token: state => state.user.token
  },

  modules: {
    theme,
    user,
    musice

  }
})
