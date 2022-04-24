<template>
    <div class="songs_page">
       <Tab :tabs="tabs" v-model="activeIndex" @onTabChange="tabChange"/>
       <SongTable :songs="songs" v-if="songs.length"/>
    </div>
</template>
<script>
import { getTopSongs } from '../../api/song'
import { normalizedSong } from '../../utill/music'
export default {
  data () {
    return {
      tabs: [{ title: '全部', type: 0 },
        { title: '华语', type: 7 },
        { title: '欧美', type: 96 },
        { title: '日本', type: 8 },
        { title: '韩国', type: 16 }],
      songs: [],
      activeIndex: 0
    }
  },
  created () {
    this.getTopSongs()
  },
  methods: {
    async getTopSongs () {
      this.songs = []
      try {
        const { data } = await getTopSongs(this.tabs[this.activeIndex].type)
        this.songs = data.map(item => {
          return normalizedSong(item)
        })
      } catch (err) {
        console.log(err)
      }
    },
    tabChange () {
      this.getTopSongs()
    }
  }

}
</script>
