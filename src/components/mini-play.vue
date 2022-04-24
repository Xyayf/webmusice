<template>
  <div class="mini_play">
    <ProgressBar
      :progress="progress"
      @changeProgress="changeProgress"
      @progressStart="progressStart"
      @progressEnd="progressEnd"
    />
    <div class="player_commponent">
      <audio
        :src="currentSong.url"
        @canplay="canplay"
        @timeupdate="timeupdate"
        @ended="ended"
        ref="audio"
      ></audio>

      <div class="control">
      <div style="width:250px">
          <Slide
          @slide="slidePlayer"
          :currentTime="currentTime"
          :duration="duration"
        />
      </div>
        <PlayIcon />
        <PlayMode />
        <!-- vloume -->
        <div class="vloume">
          <Icon
            :type="volume ? 'horn' : 'silence'"
            :size="24"
            @click="changeVolumeStatu"
          />
          <ProgressBar
            style="margin-left: 10px"
            width="100px"
            :progress="volume"
            @changeProgress="changeVolume"
            @progressEnd="volumeChange"
            allShow
          />
        </div>
        <Clipboard/>
      </div>
    </div>

    <Player :currentTime="currentTime" :class="player ? 'show' : 'hide'" />
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from '@/store/helpers/music'
import { MOD_EMAP } from '@/config/const'
import { floor } from '@/utill/number'
export default {
  name: 'Miniplayer',
  computed: {
    ...mapState(['currentSong', 'playStatue', 'playMode']),
    ...mapGetters(['nextSong']),
    progress () {
      return !this.duration ? 0 : floor(this.currentTime / this.duration, 3)
    }

  },
  data () {
    return {
      duration: 0,
      currentTime: 0,
      progressBarend: true,
      volume: 1,
      volumeStatu: true,
      player: ''
    }
  },
  mounted () {
    this.audio = this.$refs.audio
    this.volume = this.$refs.audio.volume
    this.volumeStatu = true
  },
  methods: {
    //   audio
    canplay () {
      this.duration = this.audio.duration
      //   console.log(this.duration, this.currentSong.duration)
      if (this.playStatue) {
        this.audio.play()
      }
    },
    timeupdate (e) {
      if (this.progressBarend) {
        this.currentTime = this.audio.currentTime
      }
    },
    ended () {
      if (this.currentSong.id === this.nextSong.id || MOD_EMAP[this.playMode] === 'LOOP') {
        this.audio.currentTime = 0
      } else {
        this.setCurrentSong(this.nextSong)
      }
    },
    // ProgressBar歌曲进度条
    changeProgress (progress) {
      this.currentTime = progress * this.duration
    },
    progressStart () {
      this.progressBarend = false
    },
    progressEnd () {
      this.progressBarend = true
      this.audio.currentTime = this.currentTime
    },
    // 声音进度条
    changeVolume (progress) {
      this.volume = progress
    },
    volumeChange () {
      this.audio.volume = this.volume
    },
    changeVolumeStatu () {
      this.volumeStatu = !this.volumeStatu
    },

    // slide Player
    slidePlayer (val) {
      this.player = val
    },
    ...mapActions(['setCurrentSong'])
  },
  watch: {
    playStatue (newVal) {
      if (newVal) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    volumeStatu (newVal) {
      if (!newVal) {
        console.log(this.volume)
        this.cache = this.volume
        this.volume = 0
      } else {
        this.volume = this.cache
      }
      this.volumeChange()
    }

  }

}
</script>
<style lang="less" scoped>
.mini_play {
  height: 4.28571rem;
  // box-shadow: 0px -1px 5px 0px #888888;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  .player_commponent {
    width: 100%;
    height: 100%;
    background-color: var(--body-bgcolor);
    padding: 7px;
  }
  .control {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .vloume {
      display: flex;
      align-items: center;
    }
  }
}
</style>
