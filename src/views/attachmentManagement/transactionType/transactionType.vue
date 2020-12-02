<!--
 * @Author: your name
 * @Date: 2020-11-20 11:44:49
 * @LastEditTime: 2020-11-20 15:35:03
 * @LastEditors: Please set LastEditors
 * @Description: 交易类型
 * @FilePath: \exChange\src\views\attachmentManagement\transactionType\transactionType.vue
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
    <!-- 转账类型 -->
    <g-dialog v-if="dialogShow" :dialogConfig="dialogConfig" :isVisible.sync="dialogShow">
        <div slot="body">
            <g-edit-form
                ref="editForm"
                v-if="dialogShow"
                :type="type"
                :tableConfig="pageConfig.mainFormConfig"
                :projectForm="projectForm">
            </g-edit-form>
      </div>
      <div slot="footer" class="footer">
        <el-button class="urgent" type="primary" icon="el-icon-circle-close" size="small" @click="dialogClose">
          取 消
        </el-button>
        <el-button size="small" type="primary" :disabled="type === 'info'" icon="el-icon-circle-check"
                   @click="dialogSave" v-fast-click>
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
            title: '添加',
            appendBody: false,
            center: true,
            top: '50px',
            width: '60%',
            span: '0.75'
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
    async created () {
        this.cloneProjectForm = this.$clone(this.projectForm);
        await this._getTableDataList();
    },
    methods: {
        // 获取表单
        _getTableDataList () {
            this.pageConfig.mainTable.tableData = [{
                index1: '币币账户',
                id: 1,
                children: [
                    {
                        index1: '中文',
                        id: 2,
                        index5: '收入'
                    },
                    {
                        index1: '中文',
                        id: 3,
                        index5: '支出'
                    }
                ]
            }];
            // this.handleGetTableDataList('complaintRecord/getPageList', true, () => {
            //     this.pageConfig.mainTable.tableData = [{
            //         index: 1
            //     }];
            // });
        },
        // 添加
        sysHandleAdd() {
            this.type = 'add';
            this.dialogConfig.title = '添加';
            this.dialogShow = true;
        },
        // 修改
        handleEdit(row) {
            this.type = 'edit';
            this.dialogConfig.title = '修改';
            const data = this.$clone(row);
            this.projectForm = data;
            this.dialogShow = true;
        },
        // 查看
        handleInfo(row) {
            this.type = 'info';
            this.dialogConfig.title = '查看';
            const data = this.$clone(row);
            this.projectForm = data;
            this.dialogShow = true;
        },
        // 删除
        handleDelete(row) {
            const statusConfig = {
                keyId: 'id',
                keyName: 'projectName',
                row,
                api: 'discoveryRotation/setDelete'
            };
            this.setDataDelete(statusConfig, row);
        },
        // 取消
        dialogClose() {
            this.projectForm = this.$clone(this.cloneProjectForm);
            this.dialogShow = false;
        },
        // 确定
        dialogSave() {
            this.$refs.editForm.getValidateForm(() => {
                const data = this.$clone(this.projectForm);
                this.handleSaveData(data);
                this.dialogShow = false;
            });
        }
    }
  };
</script>

<style scoped lang="scss">
</style>
