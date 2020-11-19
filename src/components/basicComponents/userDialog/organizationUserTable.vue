<template>
  <div class="organizationUserTable" v-loading="loading">
    <div class="roleCons-row">
      <div class="roleCons-contents">
        <div class="roleCons-col roleCons-col-left">
          <div class="cons">
            <organizationTable @currentRow="getCurrentRow" :offsetHeight="offsetHeight + 38">
            </organizationTable>
          </div>
        </div>
        <div class="roleCons-col roleCons-col-right">
          <div class="cons">
            <div class="cons-table">
              <div class="search_cons">
                <el-form label-position="left" :model="searchFrom" label-width="120px" @submit.native.prevent
                        class="demo-ruleForm">
                  <el-row :gutter="24">
                    <el-col :span="16">
                      <!-- 用户信息 -->
                      <el-form-item label="用户信息" prop="userName">
                        <el-input v-model.trim="searchFrom.loginName" @keyup.enter.native="handleSearch" size="small"
                                  clearable placeholder="请输入姓名，员工号/账号按enter键搜索">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" style="text-align:right;padding-right:20px;">
                      <el-button class="search" size="small" icon="el-icon-search" plain @click="handleSearch">搜 索
                      </el-button>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="contents">
                <div class="contents-table" ref="consTable">
                  <div class="cons-head" v-if="choice === 'isRadio'">
                    <div>
                      已选用户:<span v-if="configUserSele.tableData.length" style="margin-left:8px;">{{configUserSele.tableData[0].userName}}</span>
                    </div>
                    <div>
                      <el-button size="small" type="primary" icon="el-icon-circle-check"
                                @click="getCheckUser"  v-fast-click>确 定
                      </el-button>
                    </div>
                  </div>
                  <g-query-table
                    ref="queryTable"
                    v-on="$listeners"
                    :config="configUser"
                    :tableList.sync="checkList">
                  </g-query-table>
                  <div class="pages">
                    <g-to-page ref="Page" :page-size="pageSize" :total="total"
                            @sentPages="getPages">
                    </g-to-page>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="roleCons-col roleCons-col-right"  v-if="choice === 'isCheckbox'">
          <div class="cons">
            <div class="cons-table" ref="consTable">
              <div class="cons-head">
                <div>已选用户</div>
                <div>
                  <el-button size="small" type="primary" icon="el-icon-circle-check"
                            @click="getCheckUser"  v-fast-click>确 定
                  </el-button>
                </div>
              </div>
              <g-query-table
                :config="configUserSele"
                @fnName="setFnName">
              </g-query-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {search} from 'mixins/searchMixins';

  export default {
    mixins: [search],
    data () {
      return {
        configUser: {
          deleteObj: {},
          selectedList: [],
          // 表格数据
          tableData: [],
          // 表格高度
          maxHeight: 400,
          // 表头操作行配置
          tableHeader: {
            showColumnCtrl: false, // 显示/隐藏列
            refresh: false // 刷新
          },
          // 是否显示分页
          paging: false,
          // 是否默认选中第一行
          defaultSeleFirstLine: false,
          // 子系统表头渲染参数
          tableList: [
            {show: true, prop: 'userName', label: 'fConfig.name', minWidth: 100},
            {show: true, prop: 'userCode', label: 'fConfig.userCode'},
            {show: true, prop: 'mobile', label: 'fConfig.mobile'}
          ]
        },
        configUserSele: {
          // 表格数据
          tableData: [],
          // 表格高度
          maxHeight: 400,
          // 表头操作行配置
          tableHeader: {
            showColumnCtrl: false, // 显示/隐藏列
            refresh: false // 刷新
          },
          // 是否显示分页
          paging: false,
          // 是否默认选中第一行
          defaultSeleFirstLine: false,
          // 子系统表头渲染参数
          tableList: [
            {show: true, prop: 'orgName', label: 'dialog.orgName'},
            {show: true, prop: 'userName', label: 'dialog.workerName'},
            {show: true, formType: 'operate', label: 'fConfig.operate', width: '60px', center: true,
              buts:
                [
                  {name: '', fn: 'handleDelete', disabled: false, class: 'danger el-icon-delete', noAuth: true}
                ]
            }
          ]
        },
        currentOrg: {},
        tableData: [],
        tableDataCheck: [],
        checkList: [],
        offsetHeight: 500,
        pageSize: 10,
        total: 0,
        pageNo: 1,
        deleteObj: null,
        searchFrom: {
          loginName: ''
        },
        loading: false,
        recordCancelUserList: [],
        checkUserList: [],
        selectDialogList: []
      };
    },
    props: {
      choice: {
        default: 'isRadio' // isRadio 单选 isCheckbox 多选
      },
      selectedUsers: {
        default: '' // 选中的用户
      },
      // 只读
      isReadonly: {
        default: false
      }
    },
    created () {
      if (this.isReadonly) {
        this.configUserSele.tableList = [
          {show: true, prop: 'orgName', label: 'dialog.orgName'},
          {show: true, prop: 'userName', label: 'dialog.workerName'}
        ];
      } else {
        this.configUser[this.choice] = true;
      }
    },
    components: {
      organizationTable (resolve) {
        require(['./organizationTable.vue'], resolve);
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.offsetHeight = parseInt((document.body.clientHeight * 0.6), 0);
        this.configUserSele.maxHeight = this.offsetHeight - 30;
        this.configUserSele.height = this.offsetHeight - 30;
        this.configUser.maxHeight = this.offsetHeight - 80;
        this.configUser.height = this.offsetHeight - 80;
      });
    },
    watch: {
      checkList: {
        handler () {
          let data = [];
          if (this.choice === 'isRadio') {
            data = this.checkList;
            this.configUserSele.tableData = data;
            this.configUser.selectedList = data;
            this.recordCancelUserList = data;
          } else {
            data = this.checkList.concat(this.checkUserList);
            for (const item of data) {
            const index = this.selectDialogList.findIndex(val => val.id === item.id);
              item.sort = index >= 0 ? this.selectDialogList[index].sort : 0;
            }
            this.configUserSele.tableData = data.sort(this.compare);
            this.configUser.selectedList = data.sort(this.compare);
            this.recordCancelUserList = this.recordCancelUserList.concat(this.checkList);
          }
        },
        deep: true
      }
    },
    methods: {
      // 排序 比较大小
      compare(obj1, obj2) {
        const val1 = obj1.sort;
        const val2 = obj2.sort;
        if (val1 < val2) {
          return 1;
        } else if (val1 > val2) {
          return -1;
        } else {
          return 0;
        }
      },
      // 获取组织机构点击
      async getCurrentRow(row) {
        this.currentOrg = this.$clone(row);
        this.pageNo = 1;
        if (this.selectedUsers.length === 0) {
          await this._getTableDataList();
        } else {
          if (this.selectDialogList.length) {
            await this._getTableDataList();
          } else {
            await this.getSelectUser();
            await this._getTableDataList();
          }
        }
      },
      async getSelectUser() {
        let selectedUsers = [];
        this.checkUserList = [];
        this.selectDialogList = [];
        this.configUserSele.tableData = [];
        this.configUser.selectedList = [];
        if (this.selectedUsers && (typeof this.selectedUsers === 'number' || typeof this.selectedUsers === 'string')) {
          if (this.selectedUsers.length) {
            this.selectedUsers.split(',').forEach(item => {
              selectedUsers.push({id: item});
            });
          } else {
            selectedUsers = [{id: this.selectedUsers}];
          }
        } else {
          selectedUsers = this.selectedUsers;
        }
        const userIds = selectedUsers.map(v => v.id);
        let selectList = [];
        await this.$store.dispatch('publicApi/getUserInfosList', userIds).then(res => {
          selectList = res.results;
          selectList.forEach((item, index) => {
            item.id = item.userId;
            item.sort = selectList.length - index;
            this.checkUserList.push(item);
            this.selectDialogList.push(item);
          });
          this.configUserSele.tableData = selectList;
          this.configUser.selectedList = this.$clone(this.configUserSele.tableData);
        });
      },
      // 获取该组织机构下的员工
      async _getTableDataList () {
        this.loading = true;
        const data = {
          orgId: this.currentOrg.id,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          loginName: this.searchFrom.loginName
        };
        await this.$store.dispatch('publicApi/getUserList', data).then(res => {
          for (const item of res.results.records) {
            item.orgId = this.currentOrg.id;
            item.orgName = this.currentOrg.orgName;
            if (this.checkUserList.length) {
              const index = this.checkUserList.findIndex(v => v.id === item.id);
              if (index >= 0) {
                this.checkUserList.splice(index, 1);
              }
            }
          }
          this.configUser.tableData = res.results.records;
          this.total = res.results.total;
          this.loading = false;
        });
      },
      // 分页
      getPages (obj) {
        if (obj.isSzieChange) {
          this.pageSize = obj.pageSize;
        } else {
          this.pageNo = obj.pageNo;
        }
        this._getTableDataList();
      },
      // 根据函数名调用函数
      setFnName ({btnParameter, row}) {
        this[btnParameter.fn](row);
      },
      // 获取已选择人员 并且关闭弹出框
      getCheckUser () {
        this.$emit('update:isShow', false);
        this.$emit('update:userList', this.configUserSele.tableData);
        this.$emit('selectUser', this.configUserSele.tableData);
        this.$emit('recordCancelUser', this.recordCancelUserList);
      },
      // 删除已选中人员
      handleDelete (row) {
        this.configUser.deleteObj = row;
        this.configUserSele.tableData.splice(this.configUserSele.tableData.indexOf(row), 1);
        const index = this.checkUserList.findIndex(v => v.id === row.id);
        if (index >= 0) {
          this.checkUserList.splice(index, 1);
        }
        this.configUser.selectedList = JSON.parse(JSON.stringify(this.configUserSele.tableData));
      },
      // 重置
      emptyForm () {
        this.searchFrom.loginName = '';
        this.handleSearch();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .organizationUserTable {
    width: 100%;
    height: 100%;
    padding: 10px 0 !important;
    .roleCons-row {
      height: 100%;
      flex: auto;
      display: flex;
      flex-direction: column;
      .roleCons-contents{
        height: 100%;
        flex: auto;
        padding: 0 10px;
        display: flex;
        .roleCons-col-left{
          flex: 3;
        }
        .roleCons-col-right{
          flex: 7;
          margin-left: 10px;
        }
        .roleCons-col {
          height: 100%;
          padding: 10px;
          overflow: hidden;
          flex: auto;
          display: flex;
          border: 1px solid #ebeef5;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
          background-color: #fff;
          box-sizing: border-box;
          .cons {
            width: 100%;
            height: 100%;
            .cons-table {
              height: 100%;
              width: 100%;
              .contents {
                height: calc(100% - 55px);
                width: 100%;
                padding-top: 5px;
                .contents-table {
                  height: 100%;
                  background: white;
                  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
                  padding: 10px;
                  .pages {
                    text-align: center;
                    margin: 5px 0;
                  }
                }
              }
              .cons-head {
                height: 43px;
                padding-bottom: 10px;
                margin-bottom: 10px;
                border-bottom: 1px solid #eeeeee;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            }
          }
        }
      }
    }
    .check-user {
      display: flex;
    }
    .search_cons_btn1 {
      text-align: right;
      padding-right: 20px !important;
      // margin: 0 20px 0 0 !important;
    }
  }
</style>
