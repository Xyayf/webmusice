<template>
    <div class="mvs_page">
        <VideoPlay :url="url"/>
   <div @click="onClick">下一集</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      url: 'https://f.video.weibocdn.com/o0/4DRclbg5lx07VchZRbiw01041201AbEA0E010.mp4?label=mp4_1080p&template=1920x1080.25.0&media_id=4757148027256958&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=5&ot=h&ps=3lckmu&uid=738Yes&ab=3915-g1,7397-g1,6377-g0,1192-g0,1191-g0,1046-g2,1258-g0,3601-g19&Expires=1649834960&ssig=0tSwHsEEz1&KID=unistore,video'
    }
  },
  methods: {
    onClick () {
      this.url = 'https://f.video.weibocdn.com/o0/Dam0snealx07V8By8jS8010412050sMA0E020.mp4?label=mp4_1080p&template=1920x1080.25.0&media_id=4756298101882984&tp=8x8A3El:YTkl0eM8&us=0&ori=1&bf=3&ot=h&ps=3lckmu&uid=738Yes&ab=3915-g1,7397-g1,6377-g0,3601-g23,1192-g0,1191-g0,1046-g2,1258-g0&Expires=1649835969&ssig=ZD4ju0Qbjc&KID=unistore,video'
    }
  }
}
</script>
