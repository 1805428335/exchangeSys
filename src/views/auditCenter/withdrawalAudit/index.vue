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
                  <div>未分配用户列表</div>
                </div>
              </div>
            </div>
          </div>
          <div class='cons-bottom'>
            <div class='cons'>
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
          </div>
        </div>
        <transition name="el-zoom-in-center">
          <div class='contents-table table1' style='flex: 5;' v-show="isShow">
            <div class='cons-top'>
              <div class='function_cons'>
                <div class='search_cons'>
                  <div class='cons-head'>
                    <div>已分配用户列表</div>
                  </div>
                </div>
              </div>
            </div>
            <div class='cons-bottom'>
              <div class='cons'>
                      <g-query-table
                        :config="pageConfig.mainTable2">
                      </g-query-table>
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
import Page from './config';

export default {
  name: 'withdrawalAudit',
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
      },
      isShow: true
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
      this.pageConfig.mainTable2.tableData = [{
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
<style lang='scss' scoped>
.compositePage-but {
  position: absolute;
  right: 20px;
  top: 20px;
}

@import 'styles/compositePage.scss';
</style>
