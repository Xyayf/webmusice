<template>
  <div id="app">
    <Layout />
    <Miniplayer />
  </div>
</template>
<script>
import Layout from '@/layout'
export default {
  components: {
    Layout
  }
}
</script>
<style lang="less">
#app {
  overflow: auto;
  height: 100%;
  background-color: var(--body-bgcolor);
}
</style>
