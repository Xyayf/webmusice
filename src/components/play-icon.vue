<template>
    <div class="play_icon">
        <Icon
        type="prev"
        :size="24"
        color="theme"
        @click="toPrev"
        />

       <div class="togglestatue">
            <Icon
        :type="playStatue?'pause':'play'"
        :size="24"
        @click="hasCurrentSong&&toggleplayStatue(!playStatue)"
        class="paly_icon"
        />
       </div>

         <Icon
        type="next"
        :size="24"
        color="theme"
        @click="toNext"
        />
    </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from '@/store/helpers/music'

export default {
  name: 'PlayIcon',

  methods: {

    toPrev () {
      this.setCurrentSong(this.prevSong)
    },
    toNext () {
      this.setCurrentSong(this.nextSong)
    },
    ...mapMutations(['toggleplayStatue']),
    ...mapActions(['setCurrentSong'])

  },
  computed: {
    ...mapState(['playStatue']),
    ...mapGetters(['hasCurrentSong', 'nextSong', 'prevSong'])
  }

}
</script>
<style lang="less" scoped>
.play_icon{
    height: 45px;
    display: flex;
    line-height: 45px;
    width: 14.28571rem;
    justify-content: space-around;
    .togglestatue{
        width: 45px;
        height: 45px;
        background-color: @theme-color;
        text-align: center;
        border-radius: 50%;
    }
        .paly_icon{
            color: #fff;
        }

}
</style>
