<template>
    <div class="striped_list" v-if="source.length">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'striped-list',
  props: {
    source: {
      type: Array,
      default: () => []
    }
  }, // 用来监听再次渲染
  methods: {
    stripeList () {
      if (this.$slots.default && this.$slots.default.length) {
        this.$slots.default.forEach((vnode, index) => {
          console.log(vnode.elm)
          const classes = index % 2 === 1 ? 'striped-deep' : 'striped-shallow'
          vnode.elm.classList.add(classes)
        })
      }
    }
  },
  watch: {
    source () {
      this.$nextTick(() => {
        this.stripeList()
      })
    }
  }
}
// 第一次挂载 source为异步数据 所以为默认的 []空数组 下面的不会被渲染 包括solt也不会被渲染，所以在mounted调用方法根本不需要
// 第二次挂载 当 source数据请求回来后 下面的开始渲染在渲染完成后 调用方法拿到真实的dom值执行操作

// 如果是在父组件调用时  <striped-list v-if= "source.length">这样使用就可以在mounted时调用方法或者是用watch的immediate: true 和this.$nextTick()去拿到真实的dom
// 需要拿到真实的dom 才需要this.$nextTick()
</script>
<style lang="less" scoped>
.striped-deep{
   background-color: var(--body-bgcolor);
   &:hover{
       background-color: #dedede;
   }
}
.striped-shallow {
  background-color:#dedede;
}

</style>
