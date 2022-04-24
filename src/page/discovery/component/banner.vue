<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" loop :height="$Utill.toRem(200)">
    <el-carousel-item v-for="(item,index) in banner" :key="index" class="carousel-item" >
     <img :src="item.imageUrl">
    </el-carousel-item>
  </el-carousel>
    </div>
</template>
<script>
import { getBanner } from '@/api/discovery'
export default {
  created () {
    this.getBanner()
  },
  data () {
    return {
      banner: []
    }
  },
  methods: {
    async getBanner () {
      try {
        const { banners } = await getBanner()
        this.banner = banners
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.banner{
    .carousel-item{
        height:14.28571rem ;
        border-radius: .625rem;
        width: 50%;
        overflow:hidden;
        img{
            width: 100%;
            height: 100%;

        }

    }
}
</style>
