<template>
  <div class="top">
    <div class="top-title" :style="{ backgroundImage: `url(${img})` }"></div>
    <div class="mask"></div>
    <div class="content">
      <div class="img-wrap">
        <img :src="img" alt="" />
      </div>
      <div class="desc-contain">
        <p><span class="title">精品歌单</span></p>
        <p class="middle-title">{{ name }}</p>
        <p class="desc">{{ desc }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['img', 'name', 'desc', 'id']
}
</script>
<style lang="less" scoped>
.top {
  position: relative;
  overflow: hidden; //可以修剪模糊的编
  border-radius: 10px;
  padding: 12px;
  .top-title {
    position: absolute;
    background: no-repeat bottom center;
    background-size: cover;
    filter: blur(16px);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .mask {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .content {
    position: relative;
    z-index: 1;
    display: flex;
    .img-wrap {
      height: 10rem;
      width: 10rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .desc-contain {
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-flow: column;
      justify-content: center;
      p{
          margin-bottom: 5px;
           line-height: 24px;

      }
      .title {
        padding: 5px 12px;
        color: #e7aa5a;
        border: #e7aa5a solid 1px;
        border-radius: 5px;

      }
      .middle-title {
        font-size: 16px;
        color: #fff;
        font-weight: 800;

      }
      .desc {
        color: hsla(0, 0%, 100%, 0.5);
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
