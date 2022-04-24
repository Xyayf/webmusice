<template>
  <div class="search_contain">
    <div class="search">
      <input
        type="text"
        placeholder="搜索"
        v-model="searchKey"
        ref="input"
        @focus="onFocue"
        @input="onInput"
      />
      <i class="el-icon-search search_icon"></i>
    </div>
    <Toggle :show.sync="show" :reserveDom="[$refs.input]" v-show="show">
      <div style="fontsize: 12px; width: 25rem" class="toggle">
        <div class="recommend_panel" v-if="panelVariate">
          <p>热门搜索</p>
          <NButton
            @click.native="onClick(item)"
            v-for="(item, index) in hot"
            :key="index"
            class="NBtton"
            >{{ item.first }}</NButton
          >

          <p>历史搜索</p>
          <NButton
            @click.native="onClick(item)"
            v-for="(item, index) in history"
            :key="index + 10"
            class="NBtton"
            >{{ item.first }}</NButton
          >
        </div>
        <div class="search_panel" v-else>
          <div
            class="suggest_type"
            v-for="(val, index) in normalizedSuggest"
            :key="index"
          >
            <div class="title">
              <Icon :type="val.icon" :size="12" style="" />
              <span>{{ val.title }}</span>
            </div>
            <div
              class="title_text"
              v-for="song in val.data"
              :key="song.id"
              @click="val.onClick(song)"
            >
              <HightText
                :text="val.renderName(song)"
                :hightText="searchKey"
                :class="{ active: activeIndex == song.id }"
                @click.native="active(song.id)"
              />
            </div>
          </div>
        </div>
      </div>
    </Toggle>
  </div>
</template>
<script>
import debounce from 'lodash/debounce'
import { getSearchHot, getSearchSuggest } from '@/api/search'
import { setItem, getItem } from '@/utill/localstorage'
import { HISTORY } from '@/config/const'
import { joinArtistis, normalizedSong } from '@/utill/music'
import { mapActions, mapMutations } from '@/store/helpers/music'
import { push } from '@/utill/vuecomponent'
export default {
  name: 'Search',
  created () {
    this.getSearchHot()
  },
  mounted () {},
  data () {
    return {
      show: false,
      searchKey: '',
      hot: [],
      suggest: {},
      history: getItem(HISTORY) || [],
      activeIndex: null
    }
  },
  methods: {
    async getSearchHot () {
      try {
        const {
          result: { hots }
        } = await getSearchHot()
        this.hot = hots
      } catch (err) {
        console.log(err)
      }
    },
    async getSearchSuggest () {
      try {
        const { result } = await getSearchSuggest(this.searchKey)
        this.suggest = result
        // console.log(result)
      } catch (err) {
        console.log(err)
      }
    },
    onInput: debounce(function () {
      this.getSearchSuggest()
    }, 500),
    onFocue () {
      this.show = true
    },
    onClick (val) {
      this.setHistory(val)
    },
    onClickSong (songs) {
      const song = normalizedSong(songs)
      this.setCurrentSong(song)
      this.setPlayList(song)
      this.setHistory({ first: songs.name })
    },
    onClicPlaylist (playlist) {
      const { id } = playlist
      this.push(`/platlist/${id}`)
      this.show = false
    },
    onClickMv (mv) {
      const { id } = mv
      this.push(`/mv/${id}`)
      this.show = false
    },
    active (index) {
      this.activeIndex = index
    },
    setHistory (val) {
      const index = this.history.findIndex((item) => item.id === val.id)
      if (index > -1) {
        this.history.splice(index, 1)
      }

      this.history.unshift(val)
      if (this.history.length > 10) {
        this.history.length = 10
      }
      setItem(HISTORY, this.history)
      this.push(`/search/${val.first}`)
      this.show = false
    },
    push,

    ...mapActions(['setCurrentSong']),
    ...mapMutations(['setPlayList'])
  },
  computed: {
    panelVariate () {
      return !(
        this.searchKey.length &&
        this.suggest &&
        ['songs', 'playlists'].find(
          (item) => this.suggest[item] && this.suggest[item].length
        )
      )
    },
    normalizedSuggest () {
      return [
        {
          data: this.suggest.songs,
          icon: 'music',
          title: '单曲',
          renderName: (song) => `${song.name}-${joinArtistis(song.artists)}`,
          onClick: this.onClickSong // computed用的getter 不用bind也可以this也是指向实例
        },
        {
          data: this.suggest.playlists,
          icon: 'playlist',
          title: '歌单',
          renderName: (playlist) => `${playlist.name}`,
          onClick: this.onClicPlaylist.bind() // computed用的getter
        },
        {
          data: this.suggest.mvs,
          icon: 'mv',
          title: 'mv',
          renderName (mv) {
            return `${mv.name}-${joinArtistis(mv.artists)}`
          },
          onClick: this.onClickMv.bind(this) // computed用的getter
        }
      ].filter((item) => item.data && item.data.length)
    }
  }
}
</script>
<style lang="less" scoped>
.search {
  position: relative;
  color: var(--header-input-placeholder-color);
  input {
    background-color: var(--header-input-bgcolor);
    color: var(--header-input-placeholder-color);
    height: 1.71429rem;
    line-height: 1.71429rem;
    padding-left: 25px;
    border-radius: 5px;
    &::-webkit-input-placeholder {
      //用于改变placeholder的样式
      color: var(--header-input-placeholder-color);
    }
    &:focus {
      border: solid 1px @theme-color;
    }
  }
  .search_icon {
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    bottom: 0;
    left: 5px;
  }
}
.toggle {
  position: fixed;
  background-color: #fff;
  z-index: 99999;
  top: 3.57143rem;
  bottom: 4.28571rem;
  right: 0;
  width: 25rem;
}
.recommend_panel {
  font-size: 12px;
  padding: 12px;
  p {
    line-height: 25px;
  }
  .NBtton {
    margin: 5px;
  }
}
.search_panel {
  padding-top: 12px;
  font-size: 12px;
  .title {
    color: var(--font-color-grey-shallow);
    margin: 0.3125rem;
    span {
      margin: 5px;
    }
  }
  .title_text {
    line-height: 24px;

    padding: 0.3125rem 1.25rem;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      background-color: var(--menu-item-hover-bg);
    }
  }
  .active {
    background-color: var(--menu-item-hover-bg);
  }
}
</style>
