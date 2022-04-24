<template>
     <div class="slide" v-if="hasCurrentSong" >
         <div class="img-wrap" >
             <img :src="picUrl" alt="">
             <Icon :type="type? 'shrink':'open'" class="icon" :size="24" @click="changeType" />
         </div>
        <div >
             <p>{{currentSong.name}}<span> - {{currentSong.artists}}</span></p>
            <p style="fontSize:12px">{{$Utill.formatTime(currentTime)}}/{{$Utill.formatTime(duration)}}</p>
        </div>

    </div>
</template>
<script>
import { mapGetters, mapState } from '@/store/helpers/music'
export default {
  name: 'Slide',
  created () { console.log(this.currentSong) },
  props: ['currentTime', 'duration'],
  data () {
    return {
      type: false
    }
  },
  computed: {
    ...mapGetters(['hasCurrentSong']),
    ...mapState(['currentSong']),
    picUrl () {
      return this.currentSong.picUrl ? this.currentSong.picUrl : 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
    }
  },
  methods: {
    changeType () {
      this.type = !this.type
      this.$emit('slide', this.type)
    }
  }

}
</script>
<style lang="less" scoped>
.slide{

    height: 45px;
    p{
        margin:  5px 10px;
    }
    span{
        font-size: 12px;

    }

    display: flex;
    .img-wrap{
         position: relative;
        .img-wrap(45px,45px);
        border-radius: 5px;
    }
    .icon{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: rgba(255,255,255 ,.5);

        }
}

</style>
