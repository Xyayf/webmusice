<template>
    <div class="loading"
    v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"

    >

    </div>
</template>
<script>
export default {
  name: 'Loading',
  //   props: ['loading'],
  data () {
    return {
      loading: true
    }
  }
}
</script>
<style lang="less" scoped>
.loading{
    // height: 200px;
}
</style>
