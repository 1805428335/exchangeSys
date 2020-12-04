<template>
  <div class="generalPage">
    <div class="roleCons">
      <div class="content">
        <div class="cons">
          <div class="search_cons" ref="searchCons" v-if="pageConfig.searchControls.formShow">
            <template v-if="pageConfig.searchControls.searchSlotShow">
                <slot name="search" :configForm="pageConfig.searchControls"
                    :searchFormValue="pageConfig.searchControls.searchData">
                </slot>
            </template>
            <g-search-form :configForm="pageConfig.searchControls" v-else
                          :searchFormValue="pageConfig.searchControls.searchData"
                          :searchData.sync="searchData" v-on="$listeners">
            </g-search-form>
          </div>
          <div class="table_cons">
            <div class="table_cons_table" ref="table_cons">
                <div class="table-fixed-content">
                  <!--TODO 添加样式-->
                    <div class="fixed" style="display: flex;flex-direction:column ;">
                        <div class="table_btn" ref="table_btn" v-if="pageConfig.mainOperateBtn.length || pageConfig.mainBtnSlotShow || pageConfig.mainTable.tableHeader.showColumnCtrl">
                            <div  v-if="pageConfig.mainBtnSlotShow">
                                <slot name="mainBtnSlot" :pageConfig="pageConfig"></slot>
                            </div>
                            <g-button v-else :operationButtons="pageConfig.mainOperateBtn" @butFnName="mainOperateBtn">
                                <query-table-header
                                :info="pageConfig.mainTable.tableHeader"
                                :columns="pageConfig.mainTable.tableList || []"
                                @onColumnChange="onColumnChange"
                                @onRefresh="onRefreshPage"
                                ></query-table-header>
                            </g-button>
                            <slot name="mainOperateBtn"></slot>
                        </div>
                        <div class="table_content" v-loading="loading">
                            <slot name="mainTable" :scope="pageConfig.mainTable"></slot>
                        </div>
                        <div class="table_pages" v-if="pageConfig.mainTable.paging">
                            <g-to-page ref="Page"
                                    :page-sizes="pageConfig.mainTable.pageSizes"
                                    :pager-count="pageConfig.mainTable.pagerCount"
                                    :page-size="pageSize"
                                    :total="pageConfig.mainTable.total"
                                    @sentPages="getPages">
                            </g-to-page>
                        </div>
                        <div class="footer" v-if="pageConfig.isFooterShow">
                            <el-button class="urgent" type="primary" icon="el-icon-circle-close" size="small" @click="handleDialogStatus('close')">取 消</el-button>
                            <el-button size="small" type="primary" icon="el-icon-circle-check" @click="handleDialogStatus('save')" v-fast-click>确 定</el-button>
                        </div>
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {closeRoute} from 'mixins/index';

  export default {
    name: 'queryPage',
    mixins: [closeRoute],
    data () {
        return {
            tableHeaderCon: [],
            pageSize: 10,
            pageNo: 1,
            searchData: {},
            processName: 'sendProcess',
            dialogProcess: false,
            shortMsssage: true,
            assigneeUsersList: [], // 处理人
            copyPersonArr: [], // 抄送人
            selectedUsersList: [], // 选中的人员
            selectedUserDialog: false,
            sendProcessForm: {},
            printFlag: false
        };
    },
    props: {
        // 配置数据
        pageConfig: {
            type: Object,
            default: () => {
                const parmas = {
                    // 搜索配置
                    searchControls: {},
                    // 操作按钮
                    mainOperateBtn: [],
                    mainTable: {},
                    // 流程提交
                    processParmas: {}
                };
                return parmas;
            }
        },
        // 列表选中的数据
        tableSeleList: {
            type: Array,
            default: () => []
        },
        // 加载动画
        loading: {
            type: Boolean,
            default: false
        },
        dialogHeight: {
            type: Number,
            default: 300
        }
    },
    created() {
        this.pageSize = this.pageConfig.mainTable.pageSize;
        this.processParmas = this.pageConfig.processParmas;
    },
    components: {
        queryTableHeader(resolve) {
            require(['../../table/queryTable/queryTableHeader.vue'], resolve);
        }
    },
    mounted () {
        this.$nextTick(() => {
            const consHeight = this.$refs.table_cons ? this.$refs.table_cons.offsetHeight : 522;
            const searchCons = this.$refs.searchCons ? this.$refs.searchCons.offsetHeight : 0;
            let tableHeight = 0;
            const pagingHeight = this.pageConfig.mainTable.paging ? 60 : 20;
            if (this.pageConfig.isFooterShow) {
                tableHeight = this.dialogHeight - searchCons - 70 - pagingHeight;
            } else {
                tableHeight = consHeight - pagingHeight ;
            }
            if (this.$refs.table_btn) {
                tableHeight = tableHeight - 60;
            }
            this.pageConfig.mainTable.height = this.$clone(tableHeight);
            this.pageConfig.mainTable.maxHeight = this.$clone(tableHeight);
        });
    },
    watch: {
        searchData: {
            handler () {
                this.$emit('searchData', this.searchData);
            },
            deep: true
        }
    },
    methods: {
        // 操作按钮
        mainOperateBtn(fnName) {
            this.$emit('fnName', fnName);
        },
        // 列的显示与隐藏
        onColumnChange(list) {
            // 将list传出重置 tableList 配置
            this.$emit('resetTableConfigList', list);
        },
        // 刷新 列表数据
        onRefreshPage() {
            this.$emit('onRefresh', true);
        },
        // 分页
        getPages (obj) {
            if (obj.isSzieChange) {
                this.pageSize = obj.pageSize;
            } else {
                this.pageNo = obj.pageNo;
            }
            this.$emit('pages', {pageSize: this.pageSize, pageNo: this.pageNo});
        }
    }
  };
</script>

<style scoped lang="scss">
  @import 'components/basicComponents/styles/generalPage.scss';
</style>
