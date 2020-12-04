<!--
 * @Author: wumaoxia
 * @Date: 2020-11-20 10:06:28
 * @LastEditTime: 2020-11-20 11:37:15
 * @LastEditors: Please set LastEditors
 * @Description: 锁仓记录
 * @FilePath: \exChange\src\views\lockUpManagement\lockUpRecord\lockUpRecord.vue
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
    <!-- 查看收益明细 -->
    <g-dialog v-if="dialogShow" :dialogConfig="dialogConfig" :isVisible.sync="dialogShow">
        <incomeDetails slot="body" slot-scope="{height}" :dialogHeight="height"
            :close.sync="dialogShow"
            :id="tableSeleList[0].id"
            v-if="dialogShow">
        </incomeDetails>
    </g-dialog>
    <!-- 手动锁仓 -->
    <g-dialog v-if="dialogInsertOrderShow" :dialogConfig="dialogInsertOrderConfig" :isVisible.sync="dialogInsertOrderShow">
        <div slot="body">
            <g-edit-form
                ref="editForm"
                v-if="dialogInsertOrderShow"
                :type="type"
                :tableConfig="pageConfig.mainFormConfig"
                :projectForm="projectForm">
            </g-edit-form>
      </div>
      <div slot="footer" class="footer">
        <el-button class="urgent" type="primary" icon="el-icon-circle-close" size="small" @click="dialogInsertOrderClose">
          取 消
        </el-button>
        <el-button size="small" type="primary" :disabled="type === 'info'" icon="el-icon-circle-check"
                   @click="dialogInsertOrderSave" v-fast-click>
          保 存
        </el-button>
      </div>
    </g-dialog>
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
        },
        dialogShow: false,
        dialogConfig: {
            title: '收益明细',
            appendBody: false,
            center: true,
            top: '50px',
            width: '80%',
            span: '0.75'
        },
        dialogInsertOrderShow: false,
        dialogInsertOrderConfig: {
            title: '手动锁仓',
            appendBody: false,
            center: true,
            top: '150px',
            width: '60%',
            span: '0.45'
        },
        projectForm: {
            code1: '',
            code2: '',
            code3: '',
            code4: ''
        },
        cloneProjectForm: {},
        type: 'add'
      };
    },
    components: {
         incomeDetails(resolve) {
            require(['../components/incomeDetails/incomeDetails'], resolve);
        }
    },
    async created () {
        this.cloneProjectForm = this.$clone(this.projectForm);
        await this._getTableDataList();
    },
    methods: {
        // 获取表单
        _getTableDataList () {
            this.pageConfig.mainTable.tableData = [{
                index1: 1,
                id: 1,
                index7: '是',
                index4: '收益中'
            }, {
                index1: 1,
                id: 2,
                index7: '否',
                index4: '收益中'
            }, {
                index1: 1,
                index7: '否',
                id: 3,
                index4: '收益中'
            }, {
                index1: 1,
                index7: '是',
                id: 4,
                index4: '收益中'
            }, {
                index1: 1,
                index7: '否',
                id: 5,
                index4: '收益中'
            }, {
                index1: 1,
                index7: '是',
                id: 6,
                index4: '收益中'
            }];
            // this.handleGetTableDataList('complaintRecord/getPageList', true, () => {
            //     this.pageConfig.mainTable.tableData = [{
            //         index: 1
            //     }];
            // });
        },
        // 收益明细
        handleIncomeDetails() {
            if (this.tableSeleList.length === 0) {
                this.$message.error('你必须选择一条记录');
                return;
            }
            this.dialogConfig.title = `【${this.tableSeleList[0].index4}】收益明细`;
            this.dialogShow = true;
        },
        // 插入订单
        handleInsertOrder() {
            this.type = 'add';
            this.dialogInsertOrderShow = true;
        },
        // 取消
        dialogInsertOrderClose() {
            this.projectForm = this.$clone(this.cloneProjectForm);
            this.dialogInsertOrderShow = false;
        },
        // 确定
        dialogInsertOrderSave() {
            this.$refs.editForm.getValidateForm(() => {
                const data = this.$clone(this.projectForm);
                this.handleSaveData(data);
                this.dialogInsertOrderShow = false;
            });
        }
    }
  };
</script>

<style scoped lang="scss">
</style>
