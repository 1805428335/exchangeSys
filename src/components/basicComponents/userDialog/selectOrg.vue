<!--
 * @Author: your name
 * @Date: 2020-07-17 15:11:38
 * @LastEditTime: 2020-11-19 13:11:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_project-项目前期管理\src\components\basicComponents\userDialog\selectOrg.vue
-->
<template>
  <div class="dailogHeight" :style="{height: dailogHeight+ 'px'}">
    <div class="rolCons1">
      <div class="businessCons">
        <div class="businessCons_fix">
          <div ref="col" class="contents">
            <div class="OrganizationTree organizationCheckTree">
              <div class="add-dialog">
                <div class="dialog-left">
                  <div class="block">
                      <organizationTable v-bind="$attrs" v-on="$listeners" ref="organizationTable">
                      </organizationTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-footer" style="text-align: center;margin-top: 15px;">
      <el-button
        size="small" style="margin-right: 60px;"
        icon="el-icon-circle-check"
        type="primary" class="urgent"
        @click="close">取 消
      </el-button>
      <el-button
        size="small"
        icon="el-icon-circle-check"
        type="primary"
        @click="sumbit">确 定
      </el-button>
    </div>
  </div>

</template>
<script>
  import organizationTable from './organizationTable';

  export default {
    name: 'OrganizationTree',
    components: {organizationTable},
    computed: {
        dailogHeight() {
            // console.log(document.body.offsetHeight * 0.84 - 44 - 55);
            return document.body.offsetHeight * 0.84 - 44 - 55;
        }
    },
    props: {
        isRequired: {
            defaule: false
        }
    },
    data() {
        return {
            query: ''
        };
    },
    methods: {
        getQuery(val) {
            this.query = val;
        },
        getSearchList() {
            this.$refs.tree.filter(this.query);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.orgName.indexOf(value) !== -1;
        },
        // 关闭弹窗
        close() {
            this.$emit('update:close', false);
        },
        // 确定提交数据
        sumbit() {
            const userList = this.$refs.organizationTable.getOrgList();
            if (userList.length === 0 && this.isRequired) {
                this.$message.error('请选择所属公司');
                return;
            }
            this.$emit('getData', userList);
        }
    }
  };
</script>

<style scoped lang="scss">
  .dailogHeight {
    display: flex;
    flex-direction: column;
    padding:10px;
  }

  .rolCons1 {
    width: 100%;
    flex: 1;
    /*height: 500px;*/
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    box-sizing: content-box;
    .search-org {
      /*padding:0 10px;*/
      display: flex;
      margin-bottom: 10px;
    }
    .businessCons {
      flex: 1;
      border: 1px solid #ebeef5;
      /*background: pink;*/
      position: relative;
      .businessCons_fix {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        box-sizing: border-box;
        overflow-y: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .contents {
          height: 100%;
          width: 100%;
          background-color: #fff;
          .titleS {
            height: 32px;
            padding: 0 15px;
            background: rgb(228, 228, 228);
            line-height: 32px;
          }
          .notice {
            padding: 5px 10px;
            border-bottom: 1px solid #ebeef5;
            ol {
              padding: 0 15px;
              li {
                line-height: 24px;
              }
            }
          }
          .titleTypes {
            overflow-y: hidden;
            width: 100%;
            padding-left: 25px;
            .modules {
              padding-left: 10px;
              margin: 5px 0;
              .checkGroup {
                display: inline-block;
                margin-right: 36px;
              }
            }
          }
        }
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .OrganizationTree {
    height: 100%;
    width: 100%;
    /*padding-bottom: 10px;*/
    font-size: 14px;
  }

  .add-dialog {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    .dialog-left {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0px;
      background: white;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .header-search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: rgb(101, 198, 236);
        }
        div {
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .el-input--small .el-input__inner {
            width: 100px;
          }
        }
      }
      .custom-tree-node {
        width: 100%;
        line-height: 36px;
        position: relative;
        background: transparent;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
