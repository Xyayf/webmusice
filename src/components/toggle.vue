<template>
  <div class="toggle_contain">
    <slot></slot>
  </div>
</template>
<script>
import { isParent } from '@/utill/commont'

export default {
  name: 'Toggle',
  mounted () {
    this.bindClick()
    // console.log(this.reserveDom)
    // document.addEventListener('mousedown', function () {
    //   console.log('jjj')
    // })
  },
  beforeDestroy () {
    this.remmoveClick()
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    reserveDom: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handlMousdown (e) {
      const targrt = e.target
      const rangeArr = [].concat(this.reserveDom, this.$slots.default[0].elm)

      if (!isParent(targrt, rangeArr)) {
        this.$emit('update:show', false)
      }
    },
    bindClick () {
      document.addEventListener('mousedown', this.handlMousdown)
    },
    remmoveClick () {
      document.removeEventListener('mousedown', this.handlMousdown)
    }
  },
  watch: {
    show (newval) {
      if (!newval) {
        this.remmoveClick()
      } else {
        this.bindClick()
      }
    }
  }
}
</script>
