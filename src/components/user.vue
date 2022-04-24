<template>
  <div class="user_component">
    <!-- 登录 -->
    <div class="registe" @click="loginState">
      <div class="img_cover" >
        <img :src="profile.avatarUrl" v-if="isLogin" />
        <i class="user-icon iconfont icon-yonghu" v-else></i>
      </div>
      <span>{{ isLogin ? isLogin.nickname : "未登陆" }}</span>
    </div>
    <el-dialog
      title=" 登录"
      :visible.sync="loginVisible"
      :modal="false"
      center
      width="45%"

    >
      <Login />
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from '@/store/helpers/user'
import { confirmInstance } from '@/components/confirm.vue'
export default {
  name: 'User',
  data () {
    return {
      loginVisible: false

    }
  },
  computed: {
    ...mapState({
      profile: (state) => state.profile
    }),
    isLogin () {
      return this.profile
    }
  },
  watch: {
    profile (val) {
      if (val) {
        this.Visible()
      }
    }
  },
  methods: {
    ...mapActions({
      loginout: 'loginOut'
    }),
    Visible () {
      this.loginVisible = !this.loginVisible
    },
    loginState () {
      if (!this.isLogin) {
        this.Visible()
      } else {
        confirmInstance('是否确认退出', '退出登录',
          this.loginout
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.registe {
  display: flex;
  span {
    line-height: 2.1875rem;
    margin-left: .625rem;
  }
}
.img_cover {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    // vertical-align: middle;
  }
  .user-icon {
    font-size: 24px;
  }
}
</style>
