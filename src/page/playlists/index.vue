<template>
  <div class="playlists_page">
    <TopTitle v-bind="topTitle" />
    <Tab v-model="activeIndex" :tabs="tabs" @onTabChange="tabChange" />

    <div class="playList" v-if="playlist.length">
            <PlayListCard
      v-for="item in playlist"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :desc="item.description"
      :picUrl="item.coverImgUrl"
      class="playlist-item"

    />
    </div>
    <Pagination
      :current-page.sync="currentPage"
      @current-change="currentChange"
      :pageSize="limit"
      :total="total"

    />
  </div>
</template>
<script>
import TopTitle from './component/top-title.vue'
import { getPlaylists, getTopPlaylists } from '../../api/playlists'
import { scrollInto } from '../../utill/commont'
export default {
  components: {
    TopTitle
  },
  data () {
    return {

      topTitle: {},
      playlist: [],
      currentPage: 1,
      limit: 20,
      total: 0,
      activeIndex: 0,
      tabs: [
        '欧美',
        '华语',
        '流行',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        'ACG',
        '怀旧',
        '治愈',
        '旅行'
      ]
    }
  },
  created () {
    this.initDate()
  },
  methods: {
    initDate () {
      this.getPlaylists()
      this.getTopPlaylists()
    },
    async getPlaylists () {
      try {
        const { playlists, total } = await getPlaylists({
          cat: this.tabs[this.activeIndex],
          offset: (this.currentPage - 1) * this.limit,
          limit: this.limit
        })
        this.playlist = playlists
        this.total = total
        console.log(this.playlist)
      } catch (err) {
        console.log(err)
      }
    },
    async getTopPlaylists () {
      try {
        const { playlists } = await getTopPlaylists({
          cat: this.tabs[this.activeIndex]
        })
        const { id, name, description: desc, coverImgUrl: img } = playlists[0]
        this.topTitle = {
          id,
          name,
          desc,
          img
        }
      } catch (err) {
        console.log(err)
      }
    },
    async currentChange (page) {
      await this.getPlaylists()
      this.$nextTick(() => {
        scrollInto(document.querySelector('.playlists_page'))
      })
    },
    tabChange () {
      console.log(this.activeIndex)
      this.currentPage = 1
      this.initDate()
    }
  }
}
</script>
<style lang="less" scoped>
.playList{
  display: flex;
  flex-wrap: wrap;
  .playlist-item{
      flex: 1;
  }

}
</style>
