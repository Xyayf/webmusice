import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局配置
import global from '@/utill/global.js'

// rem自适应
import '@/utill/rem.js'
// 样式
import '@/style/index.less'
// import { confirmInstance } from '@/components/confirm.vue'

Vue.use(global)
// confirmInstance()
Vue.config.productionTip = false

const instance = new Vue({
  router,
  store,
  render: h => h(App)

})
instance.$mount('#app')
// console.log(instance)
