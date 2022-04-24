<template>
  <div class="comments" id="dom" >
    <div v-if="showHotComments">
      <span >精彩评论</span>
       <Comment :comment="hotComment" v-for="(hotComment,index) in hotComments" :key="index"/>

    </div>
    <div v-if="showComments">
      <span>最新</span>
     <Comment :comment="comment" v-for="(comment,index) in comments" :key="index" />
    </div>
     <Pagination
     :current-page.sync="currentPage"
    :pageSize="PAGE_SIZE"
      :total="total"
      background
      @current-change="currentChange"
    />
  </div>
</template>
<script>
import { getSongcomment, getPlayListComment, getMvComment } from '@/api/comment'
import { normalizeCommet, getPageOffset } from '@/utill/music'
import { scrollInto } from '@/utill/commont'
const SONG_TYPE = 'song'
const PLAYLIST_TYPE = 'playlist'
const MV_TYPE = 'mv'
const PAGE_SIZE = 20
export default {
  name: 'Comments',
  props: {
    id: {
      type: Number,
      require: true
    },
    type: {
      type: String,
      default: SONG_TYPE
    }
  },
  created () {
    this.PAGE_SIZE = PAGE_SIZE
  },
  mounted () {
    this.dom = document.getElementById('dom')
    this.dom.onselectstart = function (e) { // 挂载到最高父级 利用事件冒泡
      return false
    }
  },
  data () {
    return {
      hotComments: [],
      comments: [],
      // Pagination
      currentPage: 1,
      total: 40
    }
  },
  methods: {
    async getcomment () {
      const requestMap = {
        [SONG_TYPE]: getSongcomment,
        [PLAYLIST_TYPE]: getPlayListComment,
        [MV_TYPE]: getMvComment

      }
      const getcomment = requestMap[this.type]
      try {
        const { comments, hotComments, total } = await getcomment({
          id: this.id,
          limit: PAGE_SIZE,
          offset: getPageOffset(this.currentPage, PAGE_SIZE)
        })
        this.hotComments = normalizeCommet(hotComments)
        this.comments = normalizeCommet(comments)
        this.total = total
      } catch (err) {
        console.log(err)
      }
    },
    // Pagination
    async currentChange () {
      await this.getcomment()
      console.log(this.hotComments, this.comments)
      this.$nextTick(() => {
        scrollInto(this.dom)
      })
    }
  },
  // data,watch(immediate:ture),create
  watch: {
    id: {
      handler (newVal) {
        this.getcomment()
      },
      immediate: true
    }
  },
  computed: {
    showHotComments () {
      return this.hotComments && this.hotComments.length > 0
    },
    showComments () {
      return this.comments && this.comments.length > 0
    }
  }
}
</script>
<style lang="less" scoped>
.comments{
    padding: 1.25rem;
    span{
        font-size: 16px;
    }
}
</style>
