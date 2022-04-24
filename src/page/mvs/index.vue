<template>
  <div class="mvs">
   <div class="tab-contain">
     <span class="tabitem">地区：</span> <Tab :tabs="areas" v-model="activeArea" type="split"> </Tab>
   </div>
   <div class="tab-contain">
     <span class="tabitem"> 类型：</span><Tab :tabs="types" v-model="activeType" type="split"></Tab>
   </div>
    <div class="tab-contain">
      <span  class="tabitem">排序：</span><Tab :tabs="orders" v-model="activeOrder" type="split"></Tab>
    </div>
    <ContentPagination @success="getMv" :getData="getAllMvs" :params="paginationParams" type="split">
      <div class="mvcontain">
        <MvCard v-bind="item" v-for="(item) in mvs" :key="item.id" class=" mvcard"/>
      </div>
    </ContentPagination>
  </div>
</template>
<script>
import { getAllMvs } from '../../api/mv'
import { joinArtistis } from '../../utill/music'
export default {
  data: function () {
    return {
      areas: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      types: ['全部', '官方版', '原声', '现场版', '网易出品'],
      orders: ['上升最快', '最热', '最新'],
      activeArea: 0,
      activeType: 0,
      activeOrder: 0,
      getAllMvs,
      mvs: [] // 'name', 'id', 'picUrl', 'duration', 'playCount', 'author'
    }
  },
  methods: {
    getMv (data) {
      this.mvs = data.map(item => {
        const { id, name, cover: picUrl, duration, playCount, artists } = item
        return {
          id, name, picUrl, duration: duration / 1000, playCount, author: joinArtistis(artists)
        }
      })
      console.log(this.mvs)
    }
  },
  computed: {
    paginationParams () {
      return {
        area: this.areas[this.activeArea],
        type: this.types[this.activeType],
        order: this.orders[this.activeOrder]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tab-contain{
  display: flex;
  margin: 10px 0;
  .tabitem{
   padding: 4px 10px;
      margin: 0 5px;
      font-size: @font-size-sm;

}
}
.mvcontain{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .mvcard{
    margin: 10px 10px;
    width: 20%;
  }

}

</style>
