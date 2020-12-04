<!--
 * @Author: your name
 * @Date: 2020-11-20 11:44:00
 * @LastEditTime: 2020-11-20 11:44:15
 * @LastEditors: Please set LastEditors
 * @Description: 帮助中心
 * @FilePath: \exChange\src\views\attachmentManagement\helpCenter\helpCenter.vue
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
                    <div>帮助中心</div>
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
                            icon='el-icon-plus'
                            size='small'
                            @click='handleAdd'>
                        添加</el-button>
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
                            <div>帮助明细</div>
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
                                    icon='el-icon-plus'
                                    size='small'
                                    @click='handleChildrenAdd'>
                                添加</el-button>
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
        <!-- 弹出框 -->
        <g-dialog v-if="dialogShow" :dialogConfig="dialogConfig" :isVisible.sync="dialogShow">
            <div slot="body">
                <g-edit-form
                    ref="editForm"
                    v-if="dialogShow"
                    :type="type"
                    :tableConfig="mainFormConfig"
                    :projectForm="projectForm">
                </g-edit-form>
        </div>
        <div slot="footer" class="footer">
            <el-button class="urgent" type="primary" icon="el-icon-circle-close" size="small" @click="dialogClose">
            取 消
            </el-button>
            <el-button class="other" type="primary" :disabled="type === 'info'" icon="el-icon-refresh" size="small" @click="dialogReset">
            重 置
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
import { search } from 'mixins/searchMixins';
import { basicList } from 'mixins/index';
import queryPageConfig from './config';

export default {
  name: 'helpCenter',
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
        offsetHeight: 500,
        offsetHeightRight: 500,
        isShow: true,
        formListConfig: [
            { label: '名称', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64}
        ],
        formListChildrenConfig: [
                { label: '类型', prop: 'code2', span: 24, formType: 'dicSelect', selectList: [
                    {dataName: '图文', dataCode: '图文'},
                    {dataName: '文字', dataCode: '文字'}
                    ], isRule: true
                },
                { label: '标题', prop: 'code3', span: 24, formType: 'input', isRule: true, maxlength: 64},
                { label: '图文', prop: 'code4', span: 24, formType: 'upload', limit: 1, isRule: true, inputStatus: 'hide'},
                { label: '文字', prop: 'code5', span: 24, formType: 'tinymce', limit: 1, isRule: true, inputStatus: 'hide'}
        ],
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
        mainFormConfig: {
            formList: []
        },
        type: 'add'
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
      this.configMain.maxHeight = parseInt(this.$refs.consTableRight.offsetHeight, 0) - 82;
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
    // 获取数据
    _getTableDataList () {
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        dicName: this.searchFrom.dicName
      };
      this.$store.dispatch('helpCenter/getDicList', data).then(res => {
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
      this.$store.dispatch('helpCenter/getDicItemList', {dicId: this.dicRow.id, itemName: this.searchFrom.dataName}).then(res => {
        this.configChildren.tableData = res.results;
      });
    },
    // 添加
    handleAdd() {
        this.type = 'add';
        this.mainFormConfig.formList = this.formListConfig;
        this.dialogConfig.top = '250px';
        this.dialogConfig.span = 0.35;
        this.dialogShow = true;
    },
    // 修改
    handleEdit(row) {},
    // 删除
    handleDelete(row) {},
    // 明细添加
    handleChildrenAdd() {
        this.type = 'add';
        this.mainFormConfig.formList = this.formListChildrenConfig;
        this.dialogConfig.top = '150px';
        this.dialogConfig.span = 0.65;
        this.dialogShow = true;
    },
    // 明细修改
    handleChildrenEdit(row) {},
    // 明细删除
    handleChildrenDelete(row) {},
    // 关闭弹出框
    dialogClose() {
        this.dialogShow = false;
    },
    // 重置
    dialogReset() {
        this.projectForm = this.$clone(this.cloneProjectForm);
    },
    // 保存
    dialogSave() {}
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
