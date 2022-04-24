<template>
  <div class="progress_bar " :style="{width:width}"  ref="progressbar">
    <div class="bar" ref="bar"
        @click="click"
    ></div>
    <div
      class="progress"
      ref="progressdom"
      :class="{allshow:allShow}"
    ></div>
  </div>
</template>
<script>
import { percentNumber } from '@/utill/number'
import debounce from 'lodash/debounce'
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      default: 0

    },
    width: {
      type: String,
      default: '100%'
    },
    allShow: {
      type: Boolean,
      default: false
    }

  },
  mounted () {
    this.barwidth = this.$refs.bar.offsetWidth
    this.bar = this.$refs.bar
    this.progressdom = this.$refs.progressdom
    this.progressdom.addEventListener('mousedown', this.touchstart)
    document.addEventListener('mouseup', this.touchend)
    this.dealProgress()
    window.onresize = debounce(() => {
      this.barwidth = this.$refs.bar.offsetWidth
    }, 1500)
    document.getElementById('app').onfullscreenchange = debounce(() => {
      this.barwidth = this.$refs.bar.offsetWidth
    }, 1500)
  },
  methods: {
    touchstart (e) {
      this.X = this.barwidth * this.progress
      this.startX = e.clientX
      this.$emit('progressStart')
      this.progressdom.addEventListener('mousemove', this.touchmove)
    },
    touchmove (e) {
      const moveX = Math.min(e.clientX - this.startX + this.X, this.barwidth)
      const progress = moveX / this.barwidth
      this.$emit('changeProgress', this.absProgress(progress))
    },
    touchend () {
      this.progressdom.removeEventListener('mousemove', this.touchmove)
      this.$emit('progressEnd')
    },
    dealProgress () {
      const moveX = this.barwidth * this.progress
      const percentNumbers = percentNumber(this.progress)
      if (this.progress === 1) {
        this.progressdom.style.transform = `translateX(${moveX - 5}px)`
      } else {
        this.progressdom.style.transform = `translateX(${moveX}px)`
      }
      this.bar.style.backgroundImage = 'linear-gradient(to right, red ' + percentNumbers + ',' + '#e8e8e8 ' + percentNumbers + ')'
    },
    absProgress (progress) {
      if (progress > 1) {
        progress = 1
      } else if (progress < 0) {
        progress = 0
      }
      return progress
    },

    click (e) {
      const moveX = Math.min(e.clientX - this.$refs.progressbar.offsetLeft, this.barwidth)
      const progress = moveX / this.barwidth

      this.$emit('changeProgress', this.absProgress(progress))
      this.$emit('progressEnd')
    }

  },
  watch: {
    progress () {
      this.dealProgress()
    }
  }
}
</script>
<style lang="less" scoped>
.progress_bar {
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  &:hover{
      .progress{
          display: block;
      }
  }
  .bar {
    width: 100%;
    height: 2px;
    background-color: #e8e8e8;
    //   &::before {
    //   position: absolute;
    //   content: "";
    //   top: -10px;
    //   bottom: -10px;
    //   left: -10px;
    //   right: -10px;
    // }
  }
  .progress {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: @theme-color;
    margin-top: -6px;
    position: relative;
    display: none;
    position: absolute;
    &::before {
      position: absolute;
      content: "";
      top: -10px;
      bottom: -10px;
      left: -10px;
      right: -10px;
      opacity: .8;
    }
  }
  .allshow{

          display: block !important;

  }
}
</style>
