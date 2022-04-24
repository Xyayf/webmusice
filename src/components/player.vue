<template>
  <div class="player_contain show">
    <div class="initplay" v-if="hasCurrentSong">
      <div class="top">
        <div class="left">
          <Disc />
        </div>
        <div class="right">
          <div v-if="!noLyric">没有歌词</div>
          <div v-else>
            <div class="songName">
              <h1 >{{ currentSong.name }}</h1>
              <h2 >
                歌手：<span style="color: blue">{{ currentSong.artists }}</span>
              </h2>
            </div>

            <Scroll
              ref="farther_scroll"
              :data="lyric"
              @initScorll="initScorll"
              style="height: 350px"
              class="mask-imag"
            >
              <div>
                <div
                  class="as1"
                  v-for="(item, index) in lyric"
                  :key="index"
                  :class="{ activLyric: activeIndex === index }"
                  ref="lyric"
                >
                  {{ item.lyc }}
                </div>
              </div>
            </Scroll>
          </div>
        </div>
      </div>
      <Comments
      :id="currentSong.id"
      />

    </div>
  </div>
</template>
<script>
import { getLyric, getSimiPlaylist, getSimiSong } from '@/api/musice'
import { normalizedSong, timeLyric } from '@/utill/music.js'
import { mapState, mapGetters } from '@/store/helpers/music'
const SCROLL_TYPE = 'scroll'
const WHEELL_TYPE = 'wheel'
const SCROLL_TIME = {
  [SCROLL_TYPE]: null,
  [WHEELL_TYPE]: null
}
// 当SCROLL_FLAGE对象中每个值都为真是歌词才滚动
const SCROLL_FLAGE = {
  [SCROLL_TYPE]: true,
  [WHEELL_TYPE]: true
}
// 定时器的时间
const TIME_PIRCE = 1000
export default {
  name: 'Player',
  props: ['currentTime'],
  data () {
    return {
      data: [],
      noLyric: false,
      lyric: []
    }
  },
  created () {
    this.$watch('currentSong', () => {
      this.updataLyric(this.currentSong.id)
      this.getSimi(this.currentSong.id)
    })
  },
  mounted () {},
  methods: {
    async updataLyric (id) {
      try {
        const data = await getLyric(id)
        if (data.lrc && data.lrc.lyric) {
          this.noLyric = true
          this.lyric = timeLyric(data.lrc.lyric)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getSimi (id) {
      let n = 0
      while (n < 10) {
        try {
          const [simiPlaylist, simiSong] = await Promise.all([
            getSimiPlaylist(id),
            getSimiSong(id)
          ])
          this.simiPlaylist = simiPlaylist.playlists
          this.simiSong = simiSong.songs.map((song) => {
            return normalizedSong(song)
          })
          break
        } catch (err) {
          n++
        }
      }
    },
    // scroll
    initScorll (scroller) {
      const startScroll = (type) => {
        this.clearTimeout(type)
        SCROLL_FLAGE[type] = false
      }
      const endScroll = (type) => {
        this.clearTimeout(type)
        SCROLL_TIME[type] = setTimeout(() => {
          SCROLL_FLAGE[type] = true
        }, TIME_PIRCE)
      }
      scroller.on('scrollStart', startScroll.bind(null, SCROLL_TYPE))
      scroller.on('mousewheelStart', startScroll.bind(null, SCROLL_TYPE))
      scroller.on('scrollEnd', endScroll.bind(null, SCROLL_TYPE))
      scroller.on('mousewheelEnd', startScroll.bind(null, SCROLL_TYPE))
    },
    clearTimeout (type) {
      SCROLL_TIME[type] && clearTimeout(SCROLL_TIME[type])
    },
    scrollActiveIndex () {
      if (SCROLL_FLAGE[SCROLL_TYPE] && SCROLL_FLAGE[WHEELL_TYPE]) {
        const childrenArr = this.$refs.farther_scroll.$el.children[0].children
        // const childrenArr = this.$refs.lyric

        this.$refs.farther_scroll.scroller.scrollToElement(
          childrenArr[this.activeIndex],
          200,
          0,
          true
        )
      }
    }
  },
  computed: {
    ...mapState(['currentSong']),
    ...mapGetters(['hasCurrentSong']),
    activeIndex () {
      const index = this.lyric
        ? this.lyric.findIndex((item, index) => {
          const nextItem = this.lyric[index + 1]
          if (nextItem) {
            return (
              item.time <= this.currentTime &&
                nextItem.time >= this.currentTime
            )
          } else {
            return true
          }
        })
        : -1

      return index
    }
  },
  watch: {
    activeIndex (newVal) {
      if (newVal > 0 && this.lyric) {
        this.scrollActiveIndex()
      }
    }

  }
}
</script>
<style lang="less" scoped>
.player_contain {
  position: fixed;
  background-color: #fff;
  top: 3.57143rem;
  bottom: 4.28571rem;
  left: 0;
  right: 0;
  transition: all ease-in 1s;
  z-index: -100;
  overflow: auto;
}
.show {
  transform: translateY(0px);
}
.hide {
  transform: translateY(200%);
}
.activLyric {
  color: @theme-color;
}
.initplay {
  .top {
    display: flex;
    .left {
      margin-left: 3.125rem;
    }
    .right {
      margin: 3.125rem;
       font-size: 12px;
       .mask-imag{
           .mask-image()
       }
       .as1{
           line-height: 24px;
       }
      .songName {
          margin-bottom: .625rem;

          h1{
              font-size: 24px;
              margin-bottom:.9375rem ;
          }
        h2 {
          font-weight: 400;

        }
      }
    }
  }
}
</style>
