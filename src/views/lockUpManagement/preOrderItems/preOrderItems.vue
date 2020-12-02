<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 10:04:03
 * @LastEditTime: 2020-11-20 10:14:39
 * @LastEditors: Please set LastEditors
 * @Description: 预购项目
 * @FilePath: \exChange\src\views\lockUpManagement\preOrderItems\preOrderItems.vue
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
    name: 'complaintRecord',
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
                index1: '早鸟轮'
            }, {
                index1: '第一轮'
            }, {
                index1: '第二轮'
            }, {
                index1: '黑钻第一轮'
            }, {
                index1: '黑钻第二轮'
            }, {
                index1: '黑钻第三轮'
            }];
            // this.handleGetTableDataList('complaintRecord/getPageList', true, () => {
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
                api: 'preOrderItems/setDelete'
            };
            this.setDataDelete(statusConfig, row);
        }
    }
  };
</script>

<style scoped lang="scss">
</style>
