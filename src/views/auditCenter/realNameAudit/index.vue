<!--
 * @Author: wumaoxia
 * @Date: 2020-11-19 15:51:09
 * @LastEditTime: 2020-11-20 10:14:51
 * @LastEditors: Please set LastEditors
 * @Description: 币种简介
 * @FilePath: \exChange\src\views\currencyTransaction\currencyIntroduction\currencyIntroduction.vue
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
  name: 'realNameAudit',
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
      searchData: {
      }
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
      // this.handleGetTableDataList('currencyIntroduction/getPageList', true, () => {
      //     this.pageConfig.mainTable.tableData = [{
      //         index: 1
      //     }];
      // });
    },
    // 删除
    handleDelete(row) {
      const statusConfig = {
        keyId: 'id',
        keyName: 'projectName',
        row,
        api: 'currencyIntroduction/setDelete'
      };
      this.setDataDelete(statusConfig, row);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
