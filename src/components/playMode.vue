<template>
  <div class="play_mode">
    <el-popover placement="top" trigger="hover" width="160">
      <p>{{ playModeText }}</p>
      <Icon
        :size="20"
        :type="modeIcon"
        @click="setPlayModes"
        class="mode-item"
        slot="reference"
      />
    </el-popover>
  </div>
</template>
<script>
import { mapState, mapMutations } from '@/store/helpers/music'
import { MOD_EMAP } from '@/config/const'

export default {
  name: 'PlayMode',
  data () {
    return {
      modeIcon: '',
      playModeText: ''
    }
  },
  methods: {
    ...mapMutations(['setPlayMode']),
    setPlayModes () {
      // this.playMode++ 不能这样赋值注意
      let playMode = this.playMode
      this.setPlayMode(playMode++)
    }
  },
  computed: {
    ...mapState(['playMode'])
  },
  watch: {
    playMode: {
      handler (newVal) {
        switch (MOD_EMAP[newVal]) {
          case 'SEQUENCE':
            this.modeIcon = 'sequence'
            this.playModeText = '顺序播放'
            break
          case 'LOOP':
            this.modeIcon = 'loop'
            this.playModeText = '单曲播放'
            break
          case 'RANDOM':
            this.modeIcon = 'random'
            this.playModeText = '随机播放'
        }
      },
      immediate: true
    }
  }
}
</script>
