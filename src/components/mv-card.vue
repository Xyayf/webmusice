<template>
  <div class="mv-card">
    <div class="img-wrap">
      <img :src="picUrl" alt="" />
      <IconPlay :size="34" :bgSize="51" />
      <div class="playcount">
        <Icon type="play" color="white" />
        <span>{{ playCount }}</span>
      </div>
      <span class="duration">{{$Utill.formatTime(duration)}}</span>
    </div>
    <div class="name-author">
        <p>{{name}}</p>
        <p>{{author}}</p>
    </div>
  </div>
</template>
<script>

export default {
  // ><MvCard v-bind="data"/>
  name: 'MvCard',
  props: ['name', 'id', 'picUrl', 'duration', 'playCount', 'author']

}
</script>
<style lang="less" scoped>
.mv-card {
 min-width: 10rem;
  cursor: pointer;
  font-size:12px;
  .img-wrap {
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
    .playcount {
      position: absolute;
      top: 5px;
      right: 10px;
      color: @white;
    }
  }
  .duration{
      position: absolute;
      bottom: 5px;
      right: 10px;
      color: @white;
  }
  .name-author{
      width: 100%;
      p{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 16px;
          &:nth-of-type(2){
              color: #ccc;
          }
      }
  }
}
</style>
