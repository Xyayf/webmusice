<template>
  <div class="sideMenu">
    <div class="user"
    style="padding:0 18px;"
    ><User/></div>

    <div class="playlist" v-for="(menu, index) in fullPlaylist" :key="index">
      <span v-if="menu.title" class="playlist_title">{{ menu.title }}</span>
      <ul>
        <router-link
          tag="li"
          v-for="(menuItem, index) in menu.children"
          :key="index"
          :to="menuItem.path"
          active-class="menu-item-active"
        >
          <Icon :type="menuItem.meta.icon" :size="16" />
          <span>{{ menuItem.meta.title }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters } from '@/store/helpers/user'
import { menuRoutes } from '@/router'
export default {

  data () {
    return {
      menuRoutes: [
        {
          type: 'defalut',
          children: menuRoutes
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['proPlalist', 'isLogin']),
    fullPlaylist () {
      return this.isLogin
        ? this.menuRoutes.concat(this.proPlalist)
        : this.menuRoutes
    }
  }
}
</script>
<style lang="less" scoped>
.sideMenu {
  padding: 12px 0;
  background-color: var(--modal-bg-color);
  width: 17.85714rem;
  height: calc(100% - 4.28571rem);
  overflow-y: auto;
}
.playlist {
  line-height: 36px;
  padding-top: 12px;
  .playlist_title {
    padding: 0 16px;
    font-size: 0.85714rem;
    color: var(--font-color-grey2);
  }
  li {
    padding: 0 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    span {
      margin-left: 12px;
      font-size: 0.92857rem;
    }
  }
}
.menu-item-active {
  color: @theme-color;
  background-color: var(--song-shallow-grey-bg);
}
</style>
