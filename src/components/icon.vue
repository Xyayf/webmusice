
<script>
import { toRem } from '@/utill/rem.js'
export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      require: true
    },
    color: {
      type: String,
      default: ''
    },
    background: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    getClass () {
      let iconclass = `icon-${this.type}`
      if (this.color) {
        iconclass += ` icon-color-${this.color}`
      }
      return iconclass
    },
    getstyle () {
      // 处理style fontsize
      // 当需要小于12px时
      const chromMinSize = 12
      // 将px=>rem
      const istyle = { fontSize: toRem(this.size) }
      if (this.size < chromMinSize) {
        const ratio = this.size / chromMinSize
        istyle.transform = `scale(${ratio})`
      }
      return istyle
    },
    onclick (e) {
      // e为事件对象
      this.$emit('click', e)
    }
  },
  render (h) {
    const Icon = (
      <i
        class={`iconfont icon-component icon-color ${this.getClass()}` }
        style={this.getstyle()}
        onClick={this.onclick}
      ></i>
    )
    if (this.background) { // 设置背景颜色
      // 设置背景的基础值
      const backgroundRatio = 1.56
      const backgroundSize = toRem(this.size * backgroundRatio)
      return (
        <span
          style={{ width: backgroundSize, height: backgroundSize }}
          class='background'
        >
          {Icon}
        </span>)
    }
    return Icon
  }

}
</script>
<style lang="less" scoped>
.background{

  border-radius: 50%;
  display: inline-block;
  opacity: .7;
  .flex-center();
  &:hover{
    background-color: var(--round-hover-bgcolor);

  }

}
.icon-component {
  cursor: pointer;
}
.icon-color{
   color: var(--header-font-color);
  &-theme{
    color: @theme-color;
  }
  &-white{
    color:@white
  }

}
</style>
