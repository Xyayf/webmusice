<template>
    <div class="NBtton_component">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'NButton',
  mounted () {
    // console.log(this.$slots.default[0].elm)
    // console.log(this.$children)
  }
}
</script>
<style lang="less" scoped>
.NBtton_component{
   display: inline-block;
   padding: 5px 16px;
   border: 1px solid var(--button-border-color);
   border-radius: 2px;
   text-align: center;
   cursor: pointer;
   &:hover{
       background-color: var(--button-hover-bgcolor);
   }
}
</style>
