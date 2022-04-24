<template>
    <div class="discovery_page">
        <Banner/>
        <Title>推荐歌单</Title>
        <newPlaylist />
        <Title>最新音乐</Title>
        <newSong/>
        <Title>推荐MV</Title>
        <newMvs/>
    </div>
</template>
<style lang="less" scoped>
.discovery_page{
    height: 100%;
    overflow-y: auto;
}
</style>
<script>
import Banner from '@/page/discovery/component/banner'
import newPlaylist from '@/page/discovery/component/new-playlist'
import newSong from '@/page/discovery/component/new-songs'
import newMvs from './component/new-mv'
export default {
  components: {
    Banner,
    newPlaylist,
    newSong,
    newMvs
  }

}
</script>
