<template>
  <div class="table-header-container">
    <div class="header-right">
      <!-- 显隐列 -->
      <div class="header-right-item column-ctrl-item" v-if="info.showColumnCtrl" title="显/隐列">
        <el-popover placement="bottom" width="200" trigger="click">
          <div style="padding: 10px;">
            <el-checkbox-group v-model="shows" v-loading="columnLoading">
              <el-checkbox v-for="(column,key) in columns" :key="key" :label="column.label"
                :name="column.prop" @change="onColumnChange(column, key)">{{column.label}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <el-button class="more" type="primary" slot="reference" icon="el-icon-menu" size="small">显/隐列</el-button>
        </el-popover>
      </div>
      <!-- 刷新 -->
      <div class="header-right-item" v-if="info.refresh" @click.stop="onRefresh" title="刷新">
        <el-button class="other" type="primary" slot="reference" icon="el-icon-refresh"
          size="small">刷新</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: () => ({})
      },
      columns: {
        type: Array,
        default: () => []
      },
      columnLoading: {
        type: Boolean,
        default: false
      },
      auths: {
        type: Array,
        default: () => []
      }
    },
    watch: {
      columns: {
        handler(newColumns) {
          this.shows = newColumns.filter(column => column.show).map(c => c.label);
        },
        deep: true
      }
    },
    data() {
      return {
        shows: []
      };
    },
    created() {
      if (this.columns) {
        this.shows = this.columns.filter(column => column.show).map(c => c.label);
      }
    },
    methods: {
      onColumnChange(column, key) {
        const columnObj = {
          ...column,
          show: !column.show
        };
        this.columns[key] = columnObj;
        this.$emit('onColumnChange', this.columns);
      },
      onRefresh() {
        this.$emit('onRefresh', true);
      }
    }
  };

</script>

<style lang="scss" scoped>
  .el-checkbox{
    width: 100%;
  }
  .table-header-container {
    display: inline-block;

    .header-right {
      display: flex;
      align-items: center;

      .header-right-space {
        flex: 1;
      }

      .header-right-item {
        color: #409EFF;
        cursor: pointer;
        margin-left: 10px;
      }
    }
  }

</style>
