<!--
 * @Author: your name
 * @Date: 2020-11-20 10:38:10
 * @LastEditTime: 2020-11-20 10:51:37
 * @LastEditors: Please set LastEditors
 * @Description: 收益明细
 * @FilePath: \exChange\src\views\lockUpManagement\components\incomeDetails\incomeDetails.vue
-->
<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 10:06:28
 * @LastEditTime: 2020-11-20 10:30:39
 * @LastEditors: Please set LastEditors
 * @Description: 锁仓记录
 * @FilePath: \exChange\src\views\lockUpManagement\lockUpRecord\lockUpRecord.vue
-->
<template>
  <div style="height: 100%;">
    <query-page
        ref="sysQueryPage"
        :page-config="pageConfig"
        :loading.sync="loading"
        :dialogHeight="dialogHeight"
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
    name: 'incomeDetails',
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
    props: {
        dialogHeight: {
            type: Number,
            default: 300
        },
        id: {
            default: 0
        }
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
            this.pageConfig.searchControls.searchData.id = this.id;
            // this.handleGetTableDataList('lockUpRecord/getIncomeDetailsPageList');
        }
    }
  };
</script>

<style scoped lang="scss">
</style>
