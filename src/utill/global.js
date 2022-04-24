import {
  Popover, Button, Dialog, Form, Input, FormItem, Carousel, CarouselItem, Pagination, Loading, Table,
  TableColumn
} from 'element-ui'
import * as utill from '@/utill'

export default {
  install (Vue) {
    const requireComponents = require.context('@/components', true, /[a-z0-9]+\.(jsx?|vue)$/i)

    requireComponents.keys().forEach(filename => { // filename:文件相对于@/components的文件位置字符串
      // 组件实例
      const component = requireComponents(filename)
      const componentName = component.default.name
      if (componentName) {
        Vue.component(componentName, component.default)
      }
    })
    Vue.use(Popover)
    Vue.use(Button)
    Vue.use(Dialog)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Pagination)
    Vue.use(Loading)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.prototype.$Utill = utill
  }

}
