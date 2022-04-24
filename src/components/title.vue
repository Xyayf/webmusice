<template>
    <div class="title">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'Title'

}
</script>
<style lang="less" scoped>
.title{
    font-size: @font-size-title;
    padding: 12px;
     color: var(--font-color-white);
}
</style>
