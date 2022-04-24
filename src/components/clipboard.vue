<template>
    <div class="clipboard" >
        <Icon type="share" :size="24" class="btn" data-clipboard-text="复制链接分享"/>
    </div>
</template>
<script>
import Clipboard from 'clipboard/src/clipboard.js'
import { confirmInstance } from '@/components/confirm'
export default {
  name: 'Clipboard',
  props: ['text'],
  mounted () {
    this.clipboard = new Clipboard('.btn')
    this.clipboard.on('success', function (e) {
      confirmInstance('复制成功', '提示')

      e.clearSelection()
    })
  },
  beforeDestroy () {
    this.clipboard.destroy()
  }
}
</script>
