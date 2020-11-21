<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 09:35:32
 * @LastEditTime: 2020-11-21 14:06:24
 * @LastEditors: Please set LastEditors
 * @Description: C2C 数据
 * @FilePath: \exChange\src\views\frenchCurrencyZone\C2CData\C2CData.vue
-->
<template>
  <div class='compositePage'>
      <div class="compositePage-but smallFont set" @click='isShow = !isShow'>
          <i :class=" isShow ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"> {{isShow ? '收起' : '展开'}}</i>
      </div>
    <div class='roleCons'>
      <div class='contents'>
        <div class='contents-table' style='flex: 5;'>
          <div class='cons-top'>
            <div class='function_cons'>
              <div class='search_cons'>
                <div class='cons-head'>
                  <div>订单管理</div>
                </div>
              </div>
            </div>
          </div>
          <div class='cons-bottom'>
            <div class='cons'>
              <div class='cons-table'>
                <div class='cons-head-btn'>
                    <el-button
                        type='primary'
                        icon='el-icon-search'
                        size='small'
                        class="search"
                        @click='handleSearch'>
                    查询</el-button>
                    <el-button
                        type='primary'
                        icon='el-icon-printer'
                        size='small'
                        class="other"
                        @click='handleInfo'>
                    查看付款凭证</el-button>
                    <el-button
                        type='primary'
                        icon='el-icon-delete'
                        size='small'
                        class="urgent"
                        @click='handleDelete'>
                    撤销订单</el-button>
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
                        <div>订单详情</div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class='cons-bottom'>
                    <div class='cons'>
                    <div class='cons-table'>
                        <div class='cons-head-btn'>
                            <el-button
                                type='primary'
                                icon='el-icon-printer'
                                size='small'
                                class="other"
                                @click='handleChildrenInfo'>
                            查看付款凭证</el-button>
                            <el-button
                                type='primary'
                                icon='el-icon-delete'
                                size='small'
                                class="urgent"
                                @click='handleChildrenDelete'>
                            撤销订单</el-button>
                        </div>
                        <div class='cons-table-t' ref='consTableRight'>
                        <g-query-table
                            :config="configChildren"
                            :tableList.sync="tableSeleChildrenList">
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
import { search } from 'mixins/searchMixins';
import { basicList } from 'mixins/index';
import queryPageConfig from './config';

export default {
  name: 'C2CData',
  mixins: [basicList, search],
  data () {
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
      tableSeleChildrenList: [],

      offsetHeight: 500,
      offsetHeightRight: 500,
      isShow: true
    };
  },
  created () {
    //   this._getTableDataList();
  },
  mounted () {
    this.$nextTick(() => {
      this.offsetHeight = parseInt(this.$refs.consTable.offsetHeight, 0) - 32;
      this.offsetHeightRight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 32;
      this.configChildren.maxHeight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 52;
      this.configMain.maxHeight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 52;
    });
  },
  watch: {
    dicRow: {
      handler () {
        if (!this.dicRow.id) return;
        this._getDataItemList();
      },
      immediate: true
    }
  },
  methods: {
    // 搜索数据字典
    handleSearch() {
      this._getTableDataList();
    },
    // 获取数据
    _getTableDataList () {
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        dicName: this.searchFrom.dicName
      };
      this.$store.dispatch('C2CData/getDicList', data).then(res => {
        this.configMain.tableData = res.results.records;
        if (this.configMain.tableData.length === 0) {
          this.configChildren.tableData = [];
        } else {
          this.dicRow = this.configMain.tableData[0];
        }
        this.total = res.results.total;
      });
    },
    // 获取子项数据
    _getDataItemList () {
      this.$store.dispatch('C2CData/getDicItemList', {dicId: this.dicRow.id, itemName: this.searchFrom.dataName}).then(res => {
        this.configChildren.tableData = res.results;
      });
    },
    // 主表查看付款凭证
    handleInfo() {},
    // 主表撤销订单
    handleDelete() {},
    // 子表查看付款凭证
    handleChildrenInfo() {},
    // 子表撤销订单
    handleChildrenDelete() {}
  }
};
</script>
<style lang='scss' scoped>
.compositePage-but{
    position: absolute;
    right: 20px;
    top: 20px;
}
@import 'styles/compositePage.scss';
</style>
