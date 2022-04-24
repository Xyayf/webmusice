<script>
export default {
  name: 'HightText',
  props: ['text', 'hightText'],
  mounted () {
  },
  render () {
    if (!this.hightText) return <span>{this.text}</span>
    const text = this.text.toLowerCase()
    const hightText = this.hightText.toLowerCase()
    const startIndex = text.indexOf(hightText)
    const beforeText = this.text.substr(0, startIndex)
    const middleText = this.text.substr(startIndex, startIndex + hightText.length)
    const afterText = this.text.substr(startIndex + hightText.length)
    const result = startIndex === -1 ? <span>{this.text}</span> : <span>{beforeText}<span class='hightText'>{middleText}</span>{afterText}</span>
    return result
  }
}
</script>
<style lang="less" scoped>
.hightText{
    color: @theme-color;
}
</style>
