<template>
  <div class="tab" >
    <div class="router-tab default-tab" v-if="isRouter" >
      <Scroll
        :option="{ scrollY: false, scrollX: true }"
        :data="tabs"
        ref="scroll"
        :class="{ [align]: true }"
      >
        <ul>
          <router-link
            tag="li"
            v-for="(tab, index) in normalizedTabs"
            :key="index"
            :to="tab.title"
            :active-class="`active ${activeClass}`"
            :style="getItemStyle(tab, index)"
            :class="getItemClass(tab, index)"
            class="tab-item"
          >
            <Icon :type="tab.icontype" :size="iconsize" v-if="tab.icontype" />
            <p>{{ tab.title }}</p>
          </router-link>
        </ul>
      </Scroll>
    </div>
    <div class="default-tab" v-else >
      <Scroll
        :option="{ scrollY: false, scrollX: true }"
        :data="tabs"
        ref="scroll"
        :class="{ [align]: true }"
      >
        <ul>
          <li
            v-for="(tab, index) in normalizedTabs"
            :key="index"
            :style="getItemStyle(tab, index)"
            :class="getItemClass(tab, index)"
            @click="onTabChange(index)"
            class="tab-item"
          >
            <span>{{ tab.title }}</span>
          </li>
        </ul>
      </Scroll>
    </div>
  </div>
</template>
<script>
import { getWidth } from '@/utill/commont'
export default {
  // 使用 <Tab :tabs="tabs" v-model="activeIndex" @onTabChange="tabChange" :itemStyle="{textAlign:'center'}"></Tab>
  name: 'Tab',
  props: {
    tabs: {
      // { title:必填path:  选填 type：选填} []//
      type: Array,
      default: () => []
    },
    align: {
      // center，right，left
      type: String,
      default: ''
    },
    type: {
      type: String, // 内置的样式的属性名 small theme , split
      default: 'theme'
    },
    icontype: { // 路由模式中的图标
      type: String
    },
    iconsize: {
      type: Number,
      default: 36
    },
    itemStyle: {
      type: Object,
      default: () => {}
    },
    itemClass: { // 全局的属性名在定义后在全局重写
      type: String
    },
    activeIndex: {
      type: Number
    },
    activeStyle: {
      type: Object,
      default: () => {}
    },
    activeClass: {
      type: String // 全局的属性名在定义后在全局重写
    }
  },
  model: {
    prop: 'activeIndex',
    event: 'onTabChange'
  },

  methods: {
    // style
    getItemStyle (tab, index) {
      return Object.assign(
        {},
        this.itemStyle,
        this.isActive(tab, index) ? this.activeStyle : null
      )
    },
    getItemClass (tab, index) {
      const cls = []
      if (this.itemClass) {
        cls.push(this.itemClass)
      }
      if (this.type) {
        cls.push(this.type)
      }
      if (this.isActive(tab, index)) {
        cls.push('active')
        if (this.activeClass) {
          cls.push(this.activeClass)
        }
      }
      return cls.join(' ')
    },
    onTabChange (index) {
      // 另一种用数组存储每个元素到左边的offsetleft值，然后用scrollTo API
      if (this.includeCount < this.tabs.length) {
        if (index - this.offset > 5) {
          index > this.tabs.length - this.includeCount - 1 ? this.offset = this.tabs.length - this.includeCount : this.offset = index
        } else if (index - this.offset < 5) {
          index - this.includeCount < 0 ? this.offset = 0 : this.offset = index - this.includeCount + 4
        }

        this.$refs.scroll.scroller.scrollToElement(this.elemmentArr[this.offset], 200, 0)
      }
      this.$emit('onTabChange', index)
    },
    isActive (tab, index) {
      if (this.isRouter) {
        const { resolve: path } = this.$router.resolve(tab.path)
        console.log(path, tab.path)
        return path === tab.path
      } else {
        return index === this.activeIndex
      }
    },
    getIncludeCount () {
      this.width = document.querySelector('.tab').clientWidth
      this.itemWidth = getWidth(document.querySelector('.tab-item'))
      this.includeCount = Math.floor(this.width / this.itemWidth)
      this.offset = 0
    }
  },
  computed: {
    isRouter () {
      return this.tabs.length && this.tabs[0].path
    },
    // 兼容
    normalizedTabs () {
      return typeof this.tabs[0] === 'string'
        ? this.tabs.map((item) => ({ title: item }))
        : this.tabs
    }
  },
  watch: {
    tabs: {
      handler (newVal) {
        if (newVal.length) {
          this.$nextTick(() => {
            this.elemmentArr = Array.from(this.$refs.scroll.$el.children[0].children)
            // const startElmOffsetLeft = this.$refs.scroll.$el.children[0].offsetLeft
            // console.log(this.elemmentArr.map(item => item.offsetLeft - startElmOffsetLeft))
            this.getIncludeCount()
          })
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>

.right {
  display: flex;
  justify-self: end;
  justify-content: end;
}
.center {
  display: flex;
  justify-self: center;
  justify-content: center;
}
.default-tab {
  width: 100%;
  .tab-item {
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    color: var(--tab-item-color);
    &:hover{
        color:var(--tab-item-hover-color);
    }
    //type:内置的样式
    &.small{
        font-size: @font-size-sm;
        &.active{
            color:@theme-color
        }
    }
    &.theme{
        font-size: @font-size;
        &.active{
        border-bottom: 2px solid @theme-color;
        color: @theme-color;
    }
    }
     &.split {
      font-size: @font-size-sm;
      padding: 4px 10px;
      margin: 0 5px;
      border-radius: 999em;
      &.active {
        color: @theme-color;
        background: var(--shallow-theme-bgcolor);
      }
      &:not(:last-child){
        &::after{
          content: '';
          height: @font-size-sm;
          width: 1px;
          background-color: var(--tab-item-color);
          position: relative;
           left: 15px;
          display: inline-block;
          vertical-align: middle;

        }
      }
  }}
}
.tab ul {
  display: inline-block;
  li {
    display: inline-block;
  }
}
</style>
