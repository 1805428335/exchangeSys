<!--
 * @Author: your name
 * @Date: 2020-08-26 17:48:27
 * @LastEditTime: 2020-11-20 09:55:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_projectmaterial\src\components\basicComponents\global\table\queryTable\queryTable.vue
-->
<template>
  <div>
    <el-table ref="queryTable" style="width:100%"
    :class="(config.isRadio || localConfig.isRadio) && 'radio'"
    :data="config.tableData || []"
    :stripe="config.stripe || localConfig.stripe"
    :border="config.border || localConfig.border"
    :resizable="config.resizable || localConfig.resizable"
    :size="config.size || localConfig.size"
    :height="config.maxHeight || localConfig.maxHeight"
    :maxHeight="config.maxHeight || localConfig.maxHeight"
    :fit="config.fit || localConfig.fit"
    :show-header="config.showHeader || localConfig.showHeader"
    :highlight-current-row="config.highlightCurrentRow || localConfig.highlightCurrentRow"
    :row-class-name="config.rowClassName || getRowClassName"
    :row-style="config.rowStyle || localConfig.rowStyle"
    :cell-class-name="config.cellClassName || localConfig.cellClassName"
    :cell-style="config.cellStyle || localConfig.cellStyle"
    :header-row-class-name="config.headerRowClassName || localConfig.headerRowClassName"
    :header-row-style="config.headerRowStyle || localConfig.headerRowStyle"
    :header-cell-class-name="config.headerCellClassName || localConfig.headerCellClassName"
    :header-cell-style="config.headerCellStyle || localConfig.headerCellStyle"
    :row-key="config.rowKey || localConfig.rowKey"
    :empty-text="config.emptyText || localConfig.emptyText"
    :default-expand-all="config.defaultExpandAll || localConfig.defaultExpandAll"
    :expand-row-keys="config.expandRowKeys || []"
    :tooltip-effect="config.tooltipEffect || localConfig.tooltipEffect"
    :show-summary="config.showSummary || localConfig.showSummary"
    :sum-text="config.sumText || localConfig.sumText"
    :summary-method="config.summaryMethod || localConfig.summaryMethod"
    :span-method="config.spanMethod || localConfig.spanMethod"
    :select-on-indeterminate="config.selectOnIndeterminate || localConfig.selectOnIndeterminate"
    :indent="config.indent || localConfig.indent"
    :lazy="config.lazy || localConfig.lazy"
    :load="config.load || localConfig.load"
    :tree-props="config.treeProps || localConfig.treeProps"
    @select="eventEmit('select', $event)"
    @select-all="eventEmit('select-all', $event)"
    @selection-change="selectionChange"
    @cell-mouse-enter="eventEmit('cell-mouse-enter', $event)"
    @cell-mouse-leave="eventEmit('cell-mouse-leave', $event)"
    @cell-click="eventEmit('cell-click', $event)"
    @cell-dblclick="eventEmit('cell-dblclick', $event)"
    @row-click="clickRow"
    @row-contextmenu="eventEmit('row-contextmenu', $event)"
    @row-dblclick="eventEmit('row-dblclick', $event)"
    @header-click="eventEmit('header-click', $event)"
    @header-contextmenu="eventEmit('header-contextmenu', $event)"
    @sort-change="eventEmit('sort-change', $event)"
    @filter-change="eventEmit('filter-change', $event)"
    @current-change="handleCurrentChange"
    @header-dragend="eventEmit('header-dragend', $event)"
    @expand-change="eventEmit('expand-change', $event)">
    <template slot="empty">
      <no-data>
      </no-data>
    </template>
    <el-table-column v-if="config.isCheckbox || localConfig.isCheckbox" type="selection" :selectable="selectable" align="center" :reserve-selection='true' width="50">
    </el-table-column>
    <el-table-column v-if="config.isRadio || localConfig.isRadio" type="selection" :selectable="selectable" align="center" :reserve-selection='true' width="50">
    </el-table-column>
    <!-- 序号 -->
    <el-table-column v-if="config.isIndexShow === false ? false :localConfig.isIndexShow" align="center" type="index"
      label="序号" width="60">
    </el-table-column>
    <template v-for="item in ((config.tableList || []).filter(val => val.show))">
      <el-table-column v-if="item.inputStatus !=='hide' && item.formType === 'expand'"
        :key="item.id" :fixed="item.fixed || false" :prop="item.prop" :label="item.label"
        :width="item.minWidth + '%'" type="expand"
        align="center"
        :show-overflow-tooltip="item.formType !== 'operate'">
        <template slot="header">
          <tooltips :value="item.label">
          </tooltips>
        </template>
        <template slot-scope="props">
          <slot name="expand" :scope="props"></slot>
        </template>
      </el-table-column>
      <el-table-column v-if="item.inputStatus !=='hide' && item.formType !== 'expand'"
        :key="item.id" :fixed="item.fixed || false" :prop="item.prop"
        :width="item.minWidth + '%'"
        align="center"
        :show-overflow-tooltip="item.formType !== 'operate'">
        <!-- 子级 -->
        <template v-if="item.children && item.children.length">
          <template v-for="child in item.children">
            <el-table-column v-if="child.inputStatus !=='hide' && child.formType !== 'expand'"
              :key="child.id" :fixed="child.fixed || false" :prop="child.prop"
              :width="child.minWidth + '%'"
              align="center"
              :show-overflow-tooltip="child.formType !== 'operate'">
                <template slot="header">
                <tooltips :value="child.label">
                </tooltips>
              </template>
              <template slot-scope="scope">
                <!-- 按钮 -->
                <div v-if="child.formType === 'operate'" style="text-align:center;">
                  <slot name='table-buts-suffix' :scope="scope" :item='child'></slot>
                  <!--根据不用的禁用条件禁用-->
                  <template  v-for="but in child.buts">
                    <el-button :key="but.id" :class="but.class"
                      :disabled="handleFlowStatus(scope.row,but)"
                      @click.stop.prevent="setFn(but, scope.row)" type="text" size="mini" v-fast-click>
                      {{but.name}}
                    </el-button>
                  </template>
                  <slot name='table-buts' :scope="scope.row"></slot>
                </div>
                <!-- 数据字典 -->
                <span v-else-if="child.formType === 'dicSelect'" :class="child.fn && 'midFont set'"
                  @click.stop.prevent="setFn(child, scope.row)">
                  {{setDicData(scope.row[child.prop], child.selectList)}}
                </span>
                <!-- 金额 -->
                <div v-else-if="child.formType === 'setMoney'" :class="child.fn && 'midFont set'" class="ellipsis"
                  @click.stop.prevent="setFn(child, scope.row)" style="text-align: right;">
                  {{scope.row[child.prop] | systemFilters(child)}}
                </div>
                <!-- 附件 -->
                <span v-else-if="child.formType === 'attachment'" class="midFont set"
                  @click.stop.prevent="handleViewAttachment(scope.row[child.prop])">
                  附件{{scope.row[child.prop] ? scope.row[child.prop].split(',').length : 0}}个
                </span>
                <!-- 状态 -->
                <span v-else-if="child.formType === 'status'" class="status" :class="child.statusHandle[scope.row[child.prop]]">
                  {{scope.row[child.prop]}}
                </span>
                <!-- html -->
                <span v-else-if="child.formType === 'html'" v-html="scope.row[child.prop]"></span>
                <!-- 插槽 -->
                <slot v-else-if="child.formType === 'slot'" :name="'table-' + child.prop" :row="scope.row" :item="child">
                </slot>
                <span v-else :class="child.fn && 'midFont set'">
                  <span v-if="child.fn" @click.stop.prevent="setFn(child, scope.row)">{{scope.row[child.prop] | systemFilters(child)}}</span>
                  <span v-else>{{scope.row[child.prop] | systemFilters(child)}}</span>
                </span>
              </template>
            </el-table-column>
          </template>
        </template>
        <template slot="header">
          <tooltips :value="item.label">
          </tooltips>
        </template>
        <template slot-scope="scope">
          <!-- 按钮 -->
          <div v-if="item.formType === 'operate'" style="text-align:center;">
            <slot name='table-buts-suffix' :scope="scope" :item='item'></slot>
            <!--根据不用的禁用条件禁用-->
            <template  v-for="but in item.buts">
              <el-button :key="but.id" :class="but.class"
                :disabled="handleFlowStatus(scope.row,but)"
                @click.stop.prevent="setFn(but, scope.row)" type="text" size="mini" v-fast-click>
                {{but.name}}
              </el-button>
            </template>
            <slot name='table-buts' :scope="scope.row"></slot>
          </div>
          <!-- 数据字典 -->
          <span v-else-if="item.formType === 'dicSelect'" :class="item.fn && 'midFont set'"
            @click.stop.prevent="setFn(item, scope.row)">
            {{setDicData(scope.row[item.prop], item.selectList)}}
          </span>
          <!-- 金额 -->
          <div v-else-if="item.formType === 'setMoney'" :class="item.fn && 'midFont set'" class="ellipsis"
            @click.stop.prevent="setFn(item, scope.row)" style="text-align: right;">
            {{scope.row[item.prop] | systemFilters(item)}}
          </div>
          <!-- 附件 -->
          <span v-else-if="item.formType === 'attachment'" class="midFont set"
            @click.stop.prevent="handleViewAttachment(scope.row[item.prop])">
            附件{{scope.row[item.prop] ? scope.row[item.prop].split(',').length : 0}}个
          </span>
          <!-- 状态 -->
          <span v-else-if="item.formType === 'status'" class="status" :class="item.statusHandle[scope.row[item.prop]]">
            {{scope.row[item.prop]}}
          </span>
          <!-- html -->
          <span v-else-if="item.formType === 'html'" v-html="scope.row[item.prop]"></span>
          <!-- 插槽 -->
          <slot v-else-if="item.formType === 'slot'" :name="'table-' + item.prop" :row="scope.row" :item="item">
          </slot>
          <span v-else :class="item.fn && 'midFont set'">
            <span v-if="item.fn" @click.stop.prevent="setFn(item, scope.row)">{{scope.row[item.prop] | systemFilters(item)}}</span>
            <span v-else>{{scope.row[item.prop] | systemFilters(item)}}</span>
          </span>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <!-- 附件弹框 -->
  <el-dialog
    class="el-dialog-auto" title="附件弹框" append-to-body
    center
    v-if="dialogAttachment" :visible.sync="dialogAttachment"
    width="70%">
    <attachment :gridData="gridData">
    </attachment>
  </el-dialog>
  </div>
</template>
<script>
  import LocalConfig from './defaultConfig';
  import Auth from 'util/auth';

  export default {
    name: 'queryTable',
    data () {
      return {
        localConfig: LocalConfig(),
        selectionChangeList: [],
        rowIndex: -1,
        dialogAttachment: false,
        gridData: []
      };
    },
    components: {
      attachment (resolve) {
        require(['../../upload/attachment'], resolve);
      }
    },
    props: {
      // 配置
      config: {
        type: Object,
        default: () => {
          const params = {
            tableList: [],
            doNotCheck: []
          };
          return params;
        }
      },
      getRowClassName: {
        type: Function
      }
    },
    watch: {
      'config.tableData': {
        handler() {
          // 默认选中第一行
          if (this.config.defaultSeleFirstLine) {
            this.$nextTick(() => {
              if (this.rowIndex >= 0) {
                this.$refs.queryTable.setCurrentRow(this.config.tableData[this.rowIndex]);
              } else {
                this.$refs.queryTable.setCurrentRow(this.config.tableData[0]);
              }
            });
          }
          // 多选
          this.$nextTick(() => {
            this.toggleSelection(this.config.selectedList);
          });
        },
        immediate: true
      },
      'config.tableList': {
        handler() {
          this.$nextTick(() => {
            this.$refs.queryTable.doLayout();
          });
        },
        immediate: true
      },
      // 多选
      'config.selectedList': {
        handler() {
          this.$nextTick(() => {
            this.toggleSelection(this.config.selectedList);
          });
        },
        immediate: true
      },
      // 多选是删除某一行后，取 消勾选
      'config.deleteObj': {
        handler() {
          if (this.config.deleteObj && this.config.deleteObj[this.config.rowKey || this.localConfig.rowKey]) {
              this.$nextTick(() => {
                const index = this.config.tableData.findIndex(v => v[this.config.rowKey || this.localConfig.rowKey] === this.config.deleteObj[this.config.rowKey || this.localConfig.rowKey]);
                if (index >= 0) {
                  this.$refs.queryTable.toggleRowSelection(this.config.tableData[index], false);
                }
              });
          }
        },
        immediate: true
      }
    },
    methods: {
      // 对 Table 进行重新布局
      tableDoLayout() {
        this.$refs.queryTable.doLayout();
      },
      // 展开行
      tableToggleRowExpansion(row, status) {
        this.$refs.queryTable.toggleRowExpansion(row, status);
        this.$refs.queryTable.doLayout();
      },
      // 清除勾选状态
      clearSelectionStatus() {
        this.$refs.queryTable.clearSelection();
      },
      // 禁止勾选
      selectable(row, index) {
        if (this.config.selectable) {
          return this.config.selectable(row, index);
        }
        if (this.config.doNotCheck && this.config.doNotCheck.length) {
          for (const item of this.config.doNotCheck) {
            if (row[this.config.rowKey || this.localConfig.rowKey] === item[this.config.rowKey || this.localConfig.rowKey]) {
              return false;
            } else {
              return true;
            }
          }
        } else if (row.doNotCheck) {
          return false;
        } else {
          return true;
        }
      },
      // 勾选
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.toggleSelectionChildren(row[this.config.rowKey || this.localConfig.rowKey], this.config.tableData);
          });
        } else {
          this.$refs.queryTable.clearSelection();
        }
      },
      toggleSelectionChildren (rowKey, arr) {
        for (const v of arr) {
          if (rowKey === v[this.config.rowKey || this.localConfig.rowKey]) {
            this.$refs.queryTable.toggleRowSelection(v, true);
          } else if (v.children && v.children.length) {
            this.toggleSelectionChildren(rowKey, v.children);
          }
        }
      },
      selectionChange (val) {
        if (this.config.isRadio) { // 单选
          if (val.length > 1) {
            this.$refs.queryTable.clearSelection();
            this.$refs.queryTable.toggleRowSelection(val[val.length - 1]);
          }
          if (val.length > 1) {
            this.selectionChangeList = [val[val.length - 1]];
          } else {
            this.selectionChangeList = val;
          }
          console.log(this.selectionChangeList, 'selectionChangeList');
          this.$emit('update:tableList', this.selectionChangeList);
          this.$emit('tableList', this.selectionChangeList);
        } else if (this.config.isCheckbox) {
          this.selectionChangeList = this.unique(val);
          const tableList = this.selectionChangeList;
          this.$emit('update:tableList', tableList);
          this.$emit('tableList', tableList);
        }
      },
      clickRow (row, column, event) {
        if (this.config.selectable) {
          if (!this.config.selectable(row)) return; // 自定义禁止勾选
        }
        if (row.doNotCheck) {
          return;
        }
        if (this.config.doNotCheck && this.config.doNotCheck.length) {
          for (const item of this.config.doNotCheck) {
            if (row[this.config.rowKey || this.localConfig.rowKey] === item[this.config.rowKey || this.localConfig.rowKey]) {
              return;
            }
          }
          this.$emit('rowClick', row);
          if (this.config.isRadio) { // 单选
            this.$refs.queryTable.clearSelection();
            this.$refs.queryTable.toggleRowSelection(row);
          } else if (this.config.isCheckbox) {
            this.$refs.queryTable.toggleRowSelection(row);
          }
        } else {
          this.$emit('rowClick', row);
          if (this.config.isRadio) { // 单选
            this.$refs.queryTable.clearSelection();
            this.$refs.queryTable.toggleRowSelection(row);
          } else if (this.config.isCheckbox) {
            this.$refs.queryTable.toggleRowSelection(row);
          }
        }
      },
      unique (arr) {
        const list = []; // 选中
        arr.forEach(item => {
          const index = list.findIndex(v => v[this.config.rowKey || this.localConfig.rowKey] === item[this.config.rowKey || this.localConfig.rowKey]);
          if (index < 0) {
            list.push(item);
          }
        });
        return list;
      },
      // 操作
      setFn (btnParameter, row) {
        this.$emit('fnName', {
          row,
          btnParameter
        });
      },
      // 查看附件
      handleViewAttachment(value) {
        const attachmentIdList = value.split(',');
        const data = {
          fileIds: attachmentIdList.map((item) => (item = Number(item)))
        };
        this.$store.dispatch('publicApi/getFilepath', data).then(res => {
          this.gridData = res.results;
          this.dialogAttachment = true;
        });
      },
      // 数据字典
      setDicData (value, selectList) {
        const index = selectList && selectList.findIndex(v => v.dataCode === value);
        if (index < 0) return '';
        return selectList ? selectList[index].dataName : '';
      },
      // 默认选中第一行
      handleCurrentChange (val) {
        this.rowIndex = this.config.tableData.findIndex(v => v[this.config.rowKey] === val[this
          .config.rowKey]);
        this.$emit('update:tableRow', val);
      },
      // 有流程时禁用,
      handleFlowStatus (row, but) {
        if (but.enable) return false;
        if (!this.disbaleCreateBy(row, but)) return true;
        if (but.code === 'sysHandleInfo') return false;
        if (!row.flowStatus) return false;
        if (row.flowStatus === '0') return false;
        return true;
      },

      // 表格事件
      eventEmit(eventName, params) {
        this.$emit('onTableEvent', { event: eventName, params });
      },
      // 操作列业务事件
      onEvent(option, row) {
        this.$store.commit('saveOperationId', option.id);
        this.$emit('onEvent', { event: option.event, option, params: row });
      },
      // 按钮禁用的方法
      // 是否是本人禁用
      disbaleCreateBy(row, but) {
        if (!but.isCreateBy) return true;
        if (!row.createBy) return true;
        const createBy = row.createBy;
        const userId = Auth.hasUserInfo().userId;
        return createBy === userId;
      },
      // 流程状态禁用
      disableFlowStatus(row, but) {
        if (!row.flowStatus) return false;
        if (row.flowStatus === '0') return false;
        return true;
      }
      // 启用
    }
  };

</script>
<style lang="scss" scoped>
/deep/ .el-table .cell{
    height: 23px;
  }
</style>
