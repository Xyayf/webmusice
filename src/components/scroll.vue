<template>
  <div class="scroll_wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)
export default {
  name: 'Scroll',
  data () {
    return {
      default: {
        mouseWheel: true,
        scrollY: true,
        probeType: 3,
        click: true,
        disableTouch: true
      },
      scroller: null
    }
  },
  created () {},
  props: {
    data: {
      default: () => []
    },
    option: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.scroll_wrapper = document.querySelector('.scroll_wrapper')
  },
  methods: {},

  watch: {
    // data为挂载后再立马变一次 这个适用于
    // data (newVal) {
    // console.log('chushihua')
    // this.$nextTick(() => {
    //   if (newVal && this.scroller) {
    //     this.scroller.refresh()
    //   } else {
    //     this.scroller = new BScroll(this.scroll_wrapper, Object.assign({}, this.default, this.option))
    //     this.$emit('initScorll', this.scroller)
    //   }
    // })
    // }
    // 可以拿到this data和挂载同时
    data: {
      handler (newVal) {
        this.$nextTick(() => {
          if (newVal && this.scroller) {
            this.scroller.refresh()
          } else {
            this.scroller = new BScroll(
              this.scroll_wrapper,
              Object.assign({}, this.default, this.option)
            )
            this.$emit('initScorll', this.scroller)
          }
        })
      },
      immediate: true
    }

    // 拿不到this下面这个写法
    // data: {
    //   handler: (newVal) => {
    //     console.log('chushihua')
    //     this.$nextTick(() => {
    //       if (newVal && this.scroller) {
    //         this.scroller.refresh()
    //       } else {
    //         this.scroller = new BScroll(this.scroll_wrapper, Object.assign({}, this.default, this.option))
    //         this.$emit('initScorll', this.scroller)
    //       }
    //     })
    //   },
    //   immediate: true
    // }
  }
}
</script>
<style lang="less" scoped>
.scroll_wrapper{
    overflow: hidden;
    height: 100%;
    white-space :nowrap;
    width: 100%;

}
</style>
