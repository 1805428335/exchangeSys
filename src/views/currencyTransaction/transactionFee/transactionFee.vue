<!--
 * @Author: wumaoxia
 * @Date: 2020-11-19 16:03:50
 * @LastEditTime: 2020-11-19 19:25:12
 * @LastEditors: Please set LastEditors
 * @Description: 交易手续费
 * @FilePath: \exChange\src\views\currencyTransaction\transactionFee\transactionFee.vue
-->
<template>
  <div>
    <query-page
        ref="sysQueryPage"
        :page-config="pageConfig"
        :loading.sync="loading"
        :tableSeleList.sync="tableSeleList"
        @searchData="getSearchData"
        @fnName="pageConfigBtnFnName"
        @resetTableConfigList="pageConfigResetTableConfigList"
        @onRefresh="pageConfigOnRefresh"
        @pages="pageConfigPages"
        @searchEvent="searchEvent">
        <template slot="mainTable" slot-scope="config">
          <g-query-table
            :config="config.scope"
            :tableList.sync="tableSeleList"
            @fnName="pageConfigEmitQueryTableButtonFnName">
          </g-query-table>
        </template>
    </query-page>
  </div>
</template>

<script>
  import Page from './config.js';
  import {search} from 'mixins/searchMixins';
  import Auth from 'util/auth';

  export default {
    name: 'commissionOrder',
    mixins: [search],
    data () {
      return {
        // 查询页面基础参数
        page: new Page(),
        pageConfig: {},
        loading: false,
        // =====================
        tableSeleList: [],
        partyATypeTitle: '',
        dialogVisible: false,
        // 搜索数据
        searchData: {}
      };
    },
    async created () {
      await this._getTableDataList();
    },
    methods: {
        // 获取表单
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
            // this.handleGetTableDataList('commissionOrder/getPageList', true, () => {
            //     this.pageConfig.mainTable.tableData = [{
            //         index: 1
            //     }];
            // });
        }
    }
  };
</script>

<style scoped lang="scss">
</style>
