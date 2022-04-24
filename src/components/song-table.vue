<script>
import ElTable from 'element-ui/lib/table'
import { mapState, mapActions, mapMutations } from '@/store/helpers/music'
import { formatTime } from '@/utill/format'
import { deteDateType, partArrtsProp } from '@/utill/music'
export default {
  // <SongTable :songs="songs" :hidden-column="hiddenColumn" style="fontSize:12px" highlightCurrentRow :fit="false"/>
  // 思想
  // 1.处理table的属性注意要将el-table的支持的属性接受并绑定以及对其重写
  // 2，处理table-column的属性,用jsx书写作用插槽 （可以像属性一样绑定）
  // 3，处理需要隐藏的column
  name: 'SongTable',
  props: {
    hiddenColumn: {
      type: Array,
      default: () => []
    },
    songs: {
      type: Array,
      default: () => []
    },
    renderName: {
      type: Function
    }
  },
  created () {},
  computed: {
    ...mapState(['currentSong']),
    tableAttribute () {
      // 分离props和arrts
      const { arrts, props } = partArrtsProp(this.$attrs, ElTable.props)
      return {
        ...arrts,
        on: {
          ...this.$listeners,
          'row-click': this.onClick
        },
        props: {
          ...props,
          data: this.songs,

          // 重写属性
          rowClassName: this.rowClassName,
          headerCellClassName: 'title-th'
        }

      }
    },
    showColumnAttribute () {
      const hiddenColumn = this.hiddenColumn
      return this.columnAttribute.filter(
        (columnAttribut) =>
          !hiddenColumn.find((item) => columnAttribut.props === item)
      )
    }
  },
  data () {
    const defaultscopedSlot = (text) => {
      return (
        <p class="text-ellipsis">
          <span>{text}</span>
        </p>
      )
    }
    return {
      columnAttribute: [
        {
          props: 'index',
          lable: '',
          width: '70',
          scopedSlots: {
            default: (scope) => {
              return (
                <div class="index-index">
                  {this.isActive(scope.row) ? (
                    <Icon type="horn" size={16} color="theme" />
                  ) : (
                    <span>{scope.$index + 1}</span>
                  )}
                </div>
              )
            }
          }
        },
        {
          props: 'img',
          lable: '',
          width: '100',
          scopedSlots: {
            default: (scope) => (
              <div class="img-wrap">
                <img
                  src={
                    scope.row.picUrl ||
                    'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
                  }
                />
              </div>
            )
          }
        },
        {
          props: 'name',
          lable: 'name',
          width: '110',
          className: 'song-name',
          scopedSlots: {
            default: (scope) => {
              const toMv = () => {
                this.$router.push(`mv/${scope.row.mvId}`)
              }
              return (
                <div class="tomv">
                  {defaultscopedSlot(scope.row.name)}

                  {scope.row.mvId ? (
                    <Icon type="mv" color="theme" size={14} onClick={toMv} />
                  ) : (
                    ''
                  )}
                  {this.renderName ? <p> {this.renderName(scope)}</p> : ''}
                </div>
              )
            }
          }
        },
        {
          props: 'artists',
          lable: '',
          width: '100',
          scopedSlots: {
            default: (scope) => {
              return defaultscopedSlot(scope.row.artists)
            }
          }
        },
        {
          props: 'album',
          lable: '',
          width: '100',
          scopedSlots: {
            default: (scope) => {
              return defaultscopedSlot(scope.row.album.albumName)
            }
          }
        },
        {
          props: 'duration',
          lable: '',
          width: '100',
          scopedSlots: {
            default: (scope) => {
              return <span>{formatTime(scope.row.duration)}</span>
            }
          }
        }
      ]
    }
  },
  methods: {
    ...mapActions(['setCurrentSong']),
    ...mapMutations(['setPlayList']),
    isActive (scope) {
      return scope.id === this.currentSong.id
    },
    onClick (row) {
      this.setPlayList(row)
      this.setCurrentSong(row)
    },
    // 重写rowClassName属性
    rowClassName ({ row, rowIndex }) {
      const rowClassName = this.$attrs.cellClassName
      const rowClassNameArr = []
      if (rowClassName) {
        if (deteDateType(rowClassName) === 'Function') {
          const result = rowClassName(row, rowIndex)
          rowClassNameArr.push(result)
        } else {
          rowClassNameArr.push(rowClassName)
        }
      }
      this.isActive(row) && rowClassNameArr.push('song-active')
      return rowClassNameArr.join('')
    }
  },
  render () {
    return (
      <el-table {...this.tableAttribute}>
        {this.showColumnAttribute.map((item, index) => {
          const { scopedSlots, ...attribute } = item

          return (
            <el-table-column
              key={index}
              props={attribute}
              scopedSlots={scopedSlots}
            ></el-table-column>
          )
        })}
      </el-table>
    )
  }
}
</script>
<style lang="less" scoped>
/deep/ .song-active {
  color: @theme-color !important;
}
/deep/ .title-th {
  display: none;
}
.img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.tomv {
  .text-ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.index-index {
  text-align: center;
  color: var(--font-color-grey-shallow);
}
/deep/ .el-table__body{
  width: 100% !important;
    tr {
  font-size: 12px;
  background-color: var(--body-bgcolor) !important;
  &:hover > td.el-table__cell {
background-color: var(--playlist-hover-bgcolor) !important;
}
}

}

.el-table/deep/ td.el-table__cell {
  border: none;
  padding: 5px;
}

// /deep/ .el-table__body tr.current-row > td.el-table__cell {
//   background-color: #fff !important;
// }
/deep/ .song-name {
  padding-top: 10px !important;
}
</style>
