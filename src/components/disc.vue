<template>
    <div class="disc_contain">
        <div class="pole_contain" :class="playStatue ? 'playing':''">
            <img src="../assets/play-bar.png" alt="">
        </div>
        <div class="img_contain">
            <div class="img-wraper" :class="playStatue ? 'play':'pause'">
            <img :src="picUrl" alt="">
        </div>
        </div>
    </div>
</template>
<script>
import { mapState } from '@/store/helpers/music'
export default {
  name: 'Disc',
  computed: {
    ...mapState(['currentSong', 'playStatue']),
    picUrl () {
      return this.currentSong.picUrl ? this.currentSong.picUrl : 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
    }
  }

}
</script>
<style lang="less" scoped>
.disc_contain{
    position: relative;
    padding-top: 4.375rem;
}
.img_contain{
    width: 22.85714rem;
    height: 22.85714rem;
    background: var(--song-shallow-grey-bg);
    border-radius: 50%;
    .flex-center();
    .img-wraper{
        width: 90%;
        height: 90%;
        border-radius: 50%;
        overflow: hidden;
        background-color: red;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.pole_contain{
  width: 7.14286rem;
    height: 10.42857rem;
    position: absolute;
    top:0;
    left: 40%;
    transform-origin: left top;
    z-index: 100;
    transform: rotate(-30deg);
    transition: all 1s linear;
    &.playing{
        transform: rotate(30deg);
    }
    img{
        width: 100%;
        height: 100%;
    }
}

@keyframes imganimation {
     0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.pause{
    animation: imganimation paused;

}
.play{
    animation: imganimation  5s linear infinite;

}
</style>
