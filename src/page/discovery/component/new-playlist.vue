<template>
    <div class="new-playlist">
        <ul class="playlist  clearfix">
            <li v-for="data in playLists" :key="data.id">
                <PlayListCard v-bind="data"/>
            </li>
        </ul>

    </div>
</template>
<script>
import { getNewPlaylist } from '../../../api/discovery'
export default {
  data () {
    return {
      playLists: []
    }
  },
  created () {
    this.getNewPlaylist()
  },
  methods: {
    async getNewPlaylist () {
      try {
        const { result } = await getNewPlaylist()
        this.playLists = result.map(item => {
          const { id, name, copywriter, picUrl } = item
          return {
            id,
            name,
            desc: copywriter,
            picUrl
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.playlist{
  display: flex;
  flex-wrap: wrap;
    li{
        // float: left;
        width: 20%;

    }
}
</style>
