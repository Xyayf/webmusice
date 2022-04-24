<template>
    <div class="confirm">
<el-dialog
  :visible.sync="visible"
  width="30%"
  :modal="false">
  <span slot="title">{{title || '提示'}}</span>
  <span>{{text}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm" class="confrim_button">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
// <confirm :visible=ture @confrim='confirm' :onConfrim='onConfirm'/>
import Vue from 'vue'
const Confirm = {
  name: 'confirm',
  props: ['visible', 'title', 'text', 'onConfrim'], // onConfrim确认时需要调用的回调函数

  methods: {
    confirm () {
      // this.$emit('change', !this.visible)//不可
      this.visible = !this.visible
      this.onConfrim && this.onConfrim()
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  beforeDestroy () {
    console.log('组件摧毁l')
  }
}
export default Confirm

const creatConfirm = () => {
  const Myconfirm = Vue.extend(Confirm)
  // console.log(Myconfirm)  ƒ VueComponent (options) {this._init(options); }
  let instance
  function createInstance (text, title, onConfrim) {
    if (typeof title === 'function') {
      onConfrim = title
      title = undefined
    }
    if (!instance) {
      instance = new Myconfirm({
        propsData: {
          text, title, onConfrim
        }
      })

      instance.$mount()
      document.body.appendChild(instance.$el)
    } else {
      instance.title = title
      instance.text = text
      instance.onConfrim = onConfrim
    }

    Vue.nextTick(() => {
      instance.visible = true
    })
  }
  return createInstance
}
export const confirmInstance = creatConfirm()
</script>
<style lang="less" scoped>
.confirm{
 .el-dialog{
    .box-shadow()
}

}

.confrim_button{
    width: 100%;
}
</style>
