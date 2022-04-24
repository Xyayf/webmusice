<template>
    <div class="theme">
      <el-popover
    placement="bottom-end"
    width="230"
    trigger="manual"
    v-model="visible"
    >

    <div class="thems">
      <div  v-for="(value,key,index) in themeMap" :key="index" @click="changeTheme(key)">
          <div :style="value.style" class="theme-color"></div>
          <span>{{value.title}}</span>
      </div>
  </div>
    <Icon slot="reference" type='skin' :background=true  @click="onClick"></Icon>
  </el-popover>

    </div>
</template>
<script>
import variable from '@/style/variable.js'
import variableRed from '@/style/variable-red.js'
import variableWhite from '@/style/variable-white.js'
import { mapState } from 'vuex'
const theme = {
  white: 'white',
  red: 'red',
  dark: 'dark'
}
export default {
  name: 'Theme',
  data () {
    return {
      visible: false,
      themeMap: {
        [theme.white]: {
          title: '浅色',
          file: variableWhite,
          style: {
            backgroundColor: '#F6F6F6',
            border: '1px solid #EBEAEA'
          }
        },
        [theme.red]: {
          title: '红色',
          file: variableRed,
          style: {
            backgroundColor: '#D33A31'
          }
        },
        [theme.dark]: {
          title: '深色',
          file: variable,
          style: {
            backgroundColor: '#202020'
          }
        }
      }

    }
  },
  methods: {
    onClick () {
      this.visible = !this.visible
    },
    changeTheme (themeKey) {
      this.$store.commit('theme/setTheme', themeKey)
    }
  },
  computed: {
    ...mapState({
      themeKey: state => state.theme.theme
    })
  },
  watch: {
    themeKey: {
      handler: function () {
        const theme = this.themeMap[this.themeKey].file
        Object.keys(theme).forEach(key => {
          const themeValue = theme[key]
          document.documentElement.style.setProperty(key, themeValue)
        })
      },
      immediate: true
    }
  }

}
</script>
<style lang="less" scoped>
.theme{
   margin:0 20px ;
}
.thems{
  display: flex;
  justify-content: space-around;

}
.theme-color{
  width: 25px;
  height: 25px;
  border-radius: 50%;
}
</style>
