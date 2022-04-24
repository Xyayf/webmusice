<template>
    <div class="new-mv">
        <MvCard v-for="item in mvs" :key="item.id" v-bind="item" @click.native="toMvs(item.id)"/>
    </div>
</template>
<script>
import { getNewMvs } from '../../../api/discovery'
// 'name', 'id', 'picUrl', 'duration', 'playCout', 'author'
export default {
  data () {
    return {
      mvs: []
    }
  },
  created () {
    this.getNewMvs()
  },
  methods: {
    async getNewMvs () {
      try {
        const { result } = await getNewMvs()
        this.mvs = result.map(item => {
          const { id, name, picUrl, duration, playCount, artistName } = item
          return {
            id, name, picUrl, duration: duration / 1000, author: artistName, playCount
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    toMvs (id) {
      this.$router.push(`/mvs/${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.new-mv{
    display: flex;
    padding: 0 5px;
    .mv-card{
        flex:1;
        padding: 0 10px;
    }
}
</style>
