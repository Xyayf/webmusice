<template>
  <div class="song-card" >
    <p>{{$Utill.fixPadStart(2,order)}}</p>
    <div class="image">
      <div class="img-wrap">
        <img :src="picUrl"  />
      </div>
        <IconPlay/>
    </div>
    <dl class="description">
      <dt>{{name}}</dt>
      <dd>{{artists}}</dd>
    </dl>
  </div>
</template>
<script>
export default {
  // <!-- <SongCard v-bind="data"/> -->
  name: 'SongCard',
  props: ['order', 'picUrl', 'artists', 'name']

}
</script>
<style lang="less" scoped>
.song-card {
  display: flex;
font-size: 12px;
cursor: pointer;
&:hover{
    background-color: var(--playlist-hover-bgcolor);
}
  p{
      line-height: 60px;
      text-align: center;
      padding: 0 12px;

  }
  .description{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 10px;

  }
}
.image {
  position: relative;
  .img-wrap {
    .img-wrap(60px,60px);
    border-radius: 0;
  }

}
</style>
