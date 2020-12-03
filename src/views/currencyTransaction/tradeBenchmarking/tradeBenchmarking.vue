<!--
 * @Author: wumaoxia
 * @Date: 2020-11-19 15:50:11
 * @LastEditTime: 2020-12-03 10:39:52
 * @LastEditors: Please set LastEditors
 * @Description: 交易对标
 * @FilePath: \exChange\src\views\currencyTransaction\tradeBenchmarking\tradeBenchmarking.vue
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
                            <div>未分配币种列表</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class='cons-bottom'>
                        <div class='cons'>
                        <div class='cons-table'>
                            <div class='cons-head-btn'>
                                <el-form label-position="left" :model="searchFrom" label-width="120px" class="demo-ruleForm">
                                    <el-form-item label="对标代币" prop="code1"  title="对标代币">
                                        <el-select
                                            v-model.trim="searchFrom.code1"
                                            size="small"
                                            clearable
                                            filterable
                                            style="width:100%"
                                            @change="handleSearchChange">
                                            <el-option v-for="(child,i) in benchmarkingTokenList" :key="i"
                                                :label="child.dataName"
                                                :value="child.dataCode">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
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
                <div class="switch-button">
                    <div class="distribution">
                        <!-- 分配 -->
                        <div class="el-icon-d-arrow-right" @click="handleDistribution"></div>
                        <!-- 取消分配 -->
                        <div class="el-icon-d-arrow-left" @click="handleCancelAllocation"></div>
                    </div>
                </div>
                <transition name="el-zoom-in-center">
                    <div class='contents-table' style='flex: 5;' v-show="isShow">
                        <div class='cons-top'>
                            <div class='function_cons'>
                            <div class='search_cons'>
                                <div class='cons-head'>
                                <div>已分配币种列表</div>
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
                                        @click='handleToBeAllocated'>
                                    待分配</el-button>
                                    <el-button
                                        type='primary'
                                        icon='el-icon-check'
                                        size='small'
                                        class="other"
                                        @click='handleDisplay'>
                                    显示</el-button>
                                    <el-button
                                        type='primary'
                                        icon='el-icon-close'
                                        size='small'
                                        class="urgent"
                                        @click='handleDoNotShow'>
                                    不显示</el-button>
                                    <el-button
                                        type='primary'
                                        icon='el-icon-finished'
                                        size='small'
                                        @click='handleAllocated'>
                                    已分配</el-button>
                                </div>
                                <div class='cons-table-t' ref='consTableRight'>
                                    <g-query-table
                                        :config="configChildren"
                                        :tableList.sync="tableSeleChildrenList">
                                    </g-query-table>
                                </div>
                                <div class='pages'>
                                    <g-to-page
                                        ref='childrenPage'
                                        style="margin-top:10px;"
                                        :pagerCount='5'
                                        :page-size='pageChildrenSize'
                                        :total='totalChildren'
                                        @sentPages='getChildrenPages'
                                    ></g-to-page>
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
        benchmarkingTokenList: [
            {dataName: '待分配', dataCode: '待分配'},
            {dataName: '显示', dataCode: '显示'},
            {dataName: '不显示', dataCode: '不显示'},
            {dataName: '已分配', dataCode: '已分配'}
        ],
        pageChildrenSize: 10,
        pageChildrenNo: 1,
        totalChildren: 0,
        tableSeleChildrenList: []
    };
  },
  created () {
      this._getTableDataList();
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
    //   选择后搜索
    handleSearchChange() {
        this._getTableDataList();
    },
    // 获取数据
    _getTableDataList () {
        this.configMain.tableData = [
            {
                index: 1
            }
        ];
        this.configChildren.tableData = [
            {
                index: 1,
                index2: '已分配',
                index3: '是'
            }
        ];
    //   const data = {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize,
    //     dicName: this.searchFrom.code1
    //   };
    //   this.$store.dispatch('helpCenter/getDicList', data).then(res => {
    //     this.configMain.tableData = res.results.records;
    //     if (this.configMain.tableData.length === 0) {
    //       this.configChildren.tableData = [];
    //     } else {
    //       this.dicRow = this.configMain.tableData[0];
    //     }
    //     this.total = res.results.total;
    //   });
    },
    // 获取子项数据
    _getDataItemList () {
        const childrenData = {
            pageNo: this.pageChildrenNo,
            pageSize: this.pageChildrenSize,
            dicId: this.dicRow.id
        };
        this.$store.dispatch('helpCenter/getDicItemList', childrenData).then(res => {
            this.configChildren.tableData = res.results;
        });
    },
    // 明细分页
    getChildrenPages(obj) {
        if (obj.isSzieChange) {
            this.pageChildrenSize = obj.pageSize;
        } else {
            this.pageChildrenNo = obj.pageNo;
        }
        this._getDataItemList();
    },
    // 分配
    handleDistribution() {},
    // 取消分配
    handleCancelAllocation() {},
    // 待分配
    handleToBeAllocated() {},
    // 显示
    handleDisplay() {},
    // 不显示
    handleDoNotShow() {},
    // 已分配
    handleAllocated() {}
  }
};
</script>
<style lang='scss' scoped>
.compositePage-but{
    position: absolute;
    right: 20px;
    top: 20px;
}
.switch-button{
    width: 50px;
    display: flex;
    align-items: center; /*定义body的元素垂直居中*/
    justify-content: center; /*定义body的里的元素水平居中*/
    .distribution{
        text-align: center;
        div{
            cursor: pointer;
            width: 30px;
            height: 30px;
            border: 1px solid #eeeeee;
            margin-bottom: 10px;
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
            justify-content: center; /*定义body的里的元素水平居中*/
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }
}
@import 'styles/compositePage.scss';
</style>
