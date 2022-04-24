<template>
  <div class="layout">
    <div class="header_contain">
      <Header></Header>
    </div>
    <div class="main_contain">
      <div class="sidemenu">
        <SideMenu></SideMenu>
      </div>
      <div class="context">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/layout/header'
import SideMenu from '@/layout/sideMenu'
export default {
  components: {
    Header,
    SideMenu
  }
}
</script>
<style lang="less" scoped>
.layout {
  height: 100%;
  .main_contain {
    height: calc(100% - 3.57143rem);
    display: flex;
    .context {
      flex: 1;
      // background-color: ;
      margin-bottom:4.28571rem;
      min-width: 50rem;
      padding:10px 10px 0 10px;
      overflow: auto;
    }
  }
}
</style>
