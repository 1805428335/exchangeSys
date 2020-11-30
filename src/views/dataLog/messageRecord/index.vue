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
    <g-dialog v-if="dialogShow" :dialogConfig="dialogConfig" :isVisible.sync="dialogShow">
      <div slot="body">
        <g-edit-form
          ref="editForm"
          v-if="dialogShow"
          :type="type"
          :tableConfig="pageConfig.mainFormConfig"
          :projectForm="projectForm"
        >
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
  name: 'messageRecord',
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
      // 弹窗
      dialogShow: false,
      dialogConfig: {
        title: '添加',
        appendBody: false,
        center: true,
        top: '200px',
        width: '60%',
        span: '0.4'
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
