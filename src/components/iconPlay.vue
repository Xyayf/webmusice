<template>
          <div class="icon" :style="styles">
        <Icon type="play" :size="size" color="theme"/>
      </div>
</template>
<script>
export default {
  name: 'IconPlay',
  props: {
    size: {
      type: Number,
      default: 14
    },
    bgSize: {
      type: Number,
      default: 24
    }
  },
  computed: {
    styles () {
      return {
        width: this.bgSize + 'px',
        height: this.bgSize + 'px'
      }
    }
  }

}
</script>
<style lang="less" scoped>
  .icon {
      background-color:rgba(255, 255, 255, .5);
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      .flex-center();
      i{
        opacity: 1;
      }
  }
</style>
