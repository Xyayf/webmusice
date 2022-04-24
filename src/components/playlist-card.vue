<template>
    <div class="playlist-card" @click="onClick">
       <div class="img">
            <div class="img-wrap">
            <img :src="picUrl" alt="">
            </div>
            <div class="desc">{{desc}}</div>
            <icon-play :size="24" :bgSize="36" class="icon-play"/>
       </div>
        <div class="name">{{name}}</div>
    </div>
</template>
<script>

export default {
// <PlayListCard v-bind="data"/>
  name: 'PlayListCard',
  props: ['id', 'name', 'desc', 'picUrl'],
  methods: {
    onClick () {
      this.$router.push(`/platlist/${this.id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.playlist-card{
    font-size: 12px;
    cursor: pointer;
    min-width: 142px;
     box-sizing: border-box;
        padding: 10px;
   &:hover{
       .desc{
           transform: translateY(0);
       }
       .icon-play{
          opacity: 1;
       }
   }
}
.img{
    position: relative;
    border-radius: 5px;
    overflow: hidden;
.img-wrap{
    img{
        height: 100%;
        width: 100%;
    }
    border-radius: 5px;

}
.desc{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,.4);
    transform: translateY(-100%);
    transition:all .4s;
    padding:7px ;
    color: #fff;
}
.icon-play{
    top:auto;
    left: auto;
    bottom: 0;
    right: 0;
    opacity: 0;
    transition:all .7s;
}

}
.name{
    width: 142px;
.text-ellipsis();
padding: 5px 0;

}

</style>
