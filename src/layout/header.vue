<template>
    <div class="header">
<div class="mac_button_contain" @click="toHome">
        <div class="home mac_button" >
        <Icon type='home' :size="10" />
      </div>
      <div class="exit mac_button" @click="exitFullScreen" >
        <Icon type='minus' :size="10" />
      </div>
      <div class="full mac_button" @click="requestFullscreen" >
        <Icon type='fullscreen' :size="10" />
      </div>
</div>
<div class="theme-search">

        <Search/>
         <Theme/>
</div>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
import { exitFullscreen, isFullScreen, requestFullscreen } from '@/utill/commont'
export default {
  data () {
    return {
      visible: true
    }
  },
  methods: {
    toHome () {
      if (this.$route.path !== '/discovery') {
        this.$router.push('/')
      }
    },
    exitFullScreen () {
      if (isFullScreen()) {
        exitFullscreen()
      }
    },
    requestFullscreen () {
      if (!isFullScreen()) {
        const ele = document.querySelector('#app')
        requestFullscreen(ele)
      }
    }

  }
}
</script>
<style lang="less" scoped>
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 .75rem;
  height: 3.57143rem;
  background-color:var(--header-bgcolor) ;
  .theme-search{
    display: flex;
  }
.mac_button_contain{
  &:hover{
      .mac_button >i{
      opacity: 1;
      }
       }
  display: flex;
   .mac_button{
    .round(14px,14px);
    .flex-center();
    font-weight: bold;
    color: #000;
    margin: 0 3px;

  }
  i{
    opacity: 0;
    transition: opacity  .3s;
  }
  .home{
    background-color: red;
  }
  .exit{
    background-color:orange;
  }
  .full{
    background-color: green;
  }
}

}
</style>
