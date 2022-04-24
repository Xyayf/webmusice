<template>
    <div class="video-play">
        <div id="video"></div>
    </div>

</template>
<script>
import Player from 'xgplayer'
export default {
  name: 'VideoPlay',
  props: ['url', 'poster'],
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.player = new Player({
        el: document.querySelector('#video'),
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        poster: this.poster,
        url: this.url,
        fluid: true,
        volume: 1,
        autoplay: true
      })
    }

  },
  watch: {
    url (newVal) {
      if (newVal) {
        if (!this.player) {
          this.init()
        } else {
          this.player.src = newVal
        }
      }
    }
  }

}
</script>
<style lang="less" >
.xgplayer-playbackrate{
    border-radius: 10px !important;
    ul{
        border-radius: 10px !important;
    }
}
.xgplayer-icon-exitfull{
    svg{
        width: 20px !important;
        height: 20px !important;
        fill:red;
        //SVG规范列出了可以设置为css属性的svg属性，如opacity，transform，fill，stoke，stoke-width
        //y x width height cx cy 有些在svg1.1中不能通过css来设置，新的属性列表可以在svg2中找到
        //<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> 这是1.1
//           <circle cx="100" cy="50" r="40" stroke="black"
//              stroke-width="2" fill="red" />
//          </svg>
    }
}
</style>
