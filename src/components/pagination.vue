<template>
  <div class="pagination" v-if="total>pageSize">
    <el-pagination
      layout="prev, pager, next "
      :total="total"
      :page-size="pageSize"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['pageSize', 'total']
  //   created () {
  //     console.log(this.$listeners)
  //   }

// 点击上一页下一页也会触发current-change的自定义事件
//     currentChange (e) {
//       console.log(e)
//     },
}
</script>
<style lang="less" scoped>
.pagination{
    text-align: center;

}
</style>
