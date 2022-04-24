<template>
  <div class="content-pagination">
      <slot></slot>
    <Pagination
    :current-page.sync="currentPage"
      :total="total"
      :page-size="limit"
     @current-change="onPageChange"
    />
  </div>
</template>
<script>
import { scrollInto } from '../utill/commont'
export default {
  name: 'ContentPagination',
  props: {
    getData: {
      type: Function
    },
    params: {
      type: Object
    },
    limit: {
      type: Number,
      default: 44
    },
    scrollTarget: {
      type: HTMLElement
    }

  },
  data () {
    console.log(this)
    return {
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    async getDatas () {
      try {
        const { data, count } = await this.getData({
          ...this.params,
          limit: this.limit,
          offset: (this.currentPage - 1) * this.limit
        })
        this.total = count
        this.$emit('success', data)
        if (this.scrollTarget) {
          scrollInto(this.scrollTarget)
        }
      } catch (err) {
        console.log(err)
      }
    },
    onPageChange () {
      this.getDatas()
    }
  },
  watch: {
    params: {
      handler () {
        this.currentPage = 1
        this.getDatas()
      },
      immediate: true,
      deep: true
    }
  }

}
</script>
