<!--
 * @Author: wumaoxia
 * @Date: 2020-11-19 16:05:55
 * @LastEditTime: 2020-11-23 09:59:42
 * @LastEditors: Please set LastEditors
 * @Description: 机器人
 * @FilePath: \exChange\src\views\currencyTransaction\robot\robot.vue
-->
<template>
  <div class='compositePage'>
    <div class="compositePage-but smallFont set" @click='isShow = !isShow'>
      <i :class=" isShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"> {{ isShow ? '收起' : '展开' }}</i>
    </div>
    <div class='roleCons'>
      <div class='contents'>
        <div class='contents-table' style='flex: 5;'>
          <div class='cons-top'>
            <div class='function_cons'>
              <div class='search_cons'>
                <div class='cons-head'>
                  <div>安卓APP更新</div>
                </div>
              </div>
            </div>
          </div>
          <div class='cons-bottom'>
            <div class='cons'>
              <div class='cons-table'>
                <div class='cons-head-btn'>
                </div>
                <div class='cons-table-t' ref='consTable'>
                  <g-query-table
                    :config="configMain"
                    :tableRow.sync='dicRow'
                    :tableList.sync="tableSeleList">
                  </g-query-table>
                </div>
                <div class='pages'>
                  <g-to-page
                    ref='Page'
                    style="margin-top:10px;"
                    :pagerCount='5'
                    :page-size='pageSize'
                    :total='total'
                    @sentPages='getPages'
                  ></g-to-page>
                </div>
              </div>
            </div>
          </div>
        </div>
        <transition name="el-zoom-in-center">
          <div class='contents-table table1' style='flex: 5;' v-show="isShow">
            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>IOSAPP更新</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                <div class='cons-table'>
                  <div class='cons-head-btn'>
                  </div>
                  <div class='cons-table-t' ref='consTableRight'>
                    <g-query-table
                      :config="configChildren">
                    </g-query-table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {search} from 'mixins/searchMixins';
import {basicList} from 'mixins/index';
import queryPageConfig from './config';

export default {
  name: 'roleDistribution',
  mixins: [basicList, search],
  data() {
    const pageConfig = queryPageConfig(this);
    return {
      // 数据字段
      tableData: [],
      configMain: pageConfig.configMain,

      // 数据项
      childrenTableData: [],
      configChildren: pageConfig.configChildren,

      searchFrom: {
        dicName: '',
        dataName: ''
      },

      dicRow: {}, // table 行选中的数据
      tableSeleList: [],

      offsetHeight: 500,
      offsetHeightRight: 500,
      isShow: true,
      form: {
        role: ''
      }
    };
  },
  created() {
    //   this._getTableDataList();/
  },
  mounted() {
    this.$nextTick(() => {
      this.offsetHeight = parseInt(this.$refs.consTable.offsetHeight, 0) - 32;
      this.offsetHeightRight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 32;
      this.configChildren.maxHeight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 52;
      this.configMain.maxHeight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 82;
    });
  },
  watch: {
    dicRow: {
      handler() {
        if (!this.dicRow.id) return;
        this._getDataItemList();
      },
      immediate: true
    }
  },
  methods: {
    // 添加
    handleAdd() {
    },
    // 获取数据
    _getTableDataList () {
      this.pageConfig.mainTable.tableData = [{
        index1: 1
      }, {
        index1: 1
      }, {
        index1: 1
      }, {
        index1: 1
      }, {
        index1: 1
      }, {
        index1: 1
      }];
      // this.handleGetTableDataList('currencyIntroduction/getPageList', true, () => {
      //     this.pageConfig.mainTable.tableData = [{
      //         index: 1
      //     }];
      // });
    },
    // _getTableDataList() {
    //   const data = {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize,
    //     dicName: this.searchFrom.dicName
    //   };
    //   this.$store.dispatch('C2CData/getDicList', data).then(res => {
    //     this.configMain.tableData = res.results.records;
    //     if (this.configMain.tableData.length === 0) {
    //       this.configChildren.tableData = [];
    //     } else {
    //       this.dicRow = this.configMain.tableData[0];
    //     }
    //     this.total = res.results.total;
    //   });
    // },
    // 获取子项数据
    _getDataItemList() {
      this.$store.dispatch('C2CData/getDicItemList', {
        dicId: this.dicRow.id,
        itemName: this.searchFrom.dataName
      }).then(res => {
        this.configChildren.tableData = res.results;
      });
    },
    // 启用/禁用
    handleDataStatus() {
    },
    // 修改
    handleEdit(row) {
    },
    // 删除
    handleDelete(row) {
    }
  }
};
</script>
<style lang='scss' scoped>
.compositePage-but {
  position: absolute;
  right: 20px;
  top: 20px;
}

@import 'styles/compositePage.scss';
</style>
