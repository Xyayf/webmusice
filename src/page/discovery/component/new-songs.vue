<template>
  <div class="new-song">
    <div class="list-songs">
      <div class="list-song" v-for="(list, index) in listSongs" :key="index">
        <SongCard
          v-for="item in list"
          :key="item.id"
          :name="item.name"
          :artists="item.artists"
          :picUrl="item.picUrl"
          :order="item.order"
          @click.native="addSong(item)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { getNewSongs } from '@/api/discovery'
import { normalizedSong } from '../../../utill/music'
import { partArr } from '@/utill/number'
import { mapActions, mapMutations } from '@/store/helpers/music'

export default {
  created () {
    this.getNewSongs()
  },
  data () {
    return {
      songsList: []
    }
  },
  methods: {
    ...mapActions(['setCurrentSong']),
    ...mapMutations(['setPlayList']),
    async getNewSongs () {
      try {
        const { result } = await getNewSongs()
        this.songsList = result.map((item, index) => {
          const {
            id,
            name,
            picUrl,
            song: { artists, album, duration }

          } = item

          return {
            ...normalizedSong({ id, name, picUrl, artists, album, duration }),
            order: index + 1
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    addSong (song) {
      this.setCurrentSong(song)
      this.setPlayList(song)
    }
  },
  computed: {
    listSongs () {
      return partArr(this.songsList)
    }
  }
}
</script>
<style lang="less" scoped>
.list-songs {
  display: flex;
  padding: 0 12px;
  .list-song {
    flex: 1;
    .song-card {
      padding: 5px 0;
    }
  }
}
</style>
