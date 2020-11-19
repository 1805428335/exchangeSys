<template>
  <div class="editTable">
    <div class="detailedTable">
      <el-form :model="subTable" ref="editTable" :rules="rule" :disabled="pageDisabled"
        class="demo-ruleForm">
        <el-table size="mini" :height="height" :max-height="height"
          :data="subTable.tableData" ref="multipleTable"
          class="edit-table-form"
          default-expand-all
          :row-key="subTable.rowKey || localConfig.rowKey"
          :lazy="subTable.lazy || localConfig.lazy"
          :load="subTable.load || localConfig.load"
          :tree-props="subTable.treeProps || localConfig.treeProps"
          :row-class-name="subTable.getRowClassName || getRowClassName"
          @selection-change="selectionChange">
          <template slot="empty">
            <no-data>
            </no-data>
          </template>
          <el-table-column v-if="isSelection" type="selection" align="center" key="2" label="选择"
            width="50">
          </el-table-column>
          <el-table-column type="index" align="center" v-if="subTable.isIndex !== undefined ? subTable.isIndex : true" label="序号" key="1" width="50">
          </el-table-column>
          <template v-for="(item) in slaveColumns">
            <el-table-column :key="item.prop" :label="item.label" :prop="item.prop"
              :show-overflow-tooltip="item.showOverflowTooltip !== undefined ? item.showOverflowTooltip : true"
              :align="(item.filterName === 'setMoney' || item.filterName === 'number') ? 'right' : item.align || 'left'"
              :width="item.minWidth" v-if="item.inputStatus !=='hide'">
              <template slot="header">
                <tooltips :value="item.label">
                </tooltips>
              </template>
              <template slot-scope="scope">
                <div class="ellipsis" v-if="item.formType==='text'" :style="(item.formType==='text' && (item.filterName === 'setMoney' || item.filterName === 'number')) ? 'text-align: right;' : ''">
                  <span v-if="item.fn" class="smallFont set" @click='handleTable(item, scope.row, $event, scope.$index)'>{{scope.row[item.prop] | systemFilters(item)}}</span>
                  <span v-else class="smallFont grey">{{scope.row[item.prop] | systemFilters(item)}}</span>
                </div>
                <el-form-item size="small"
                  v-else
                  :prop="subTable.treeProps? '' : `tableData.${scope.$index}.${item.prop}`"
                  :rules="rule[item.prop]">
                  <slot v-if="item.formType==='slot'" :name="'edit-table-' + item.prop" :item="item" :scope="scope.row" :rowIndex="scope.$index"></slot>
                  <el-input v-if="item.formType==='input' && item.inputStatus !== 'disable'" size="small"
                    :disabled="item.inputStatus === 'disable'" :maxlength="Number(item.maxlength)"
                    @change="handleChange(item, scope.row, $event, scope.$index)"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    v-model.trim="scope.row[item.prop]" :placeholder="item.placeholder">
                  </el-input>
                  <div class="ellipsis smallFont grey" v-else-if="item.formType==='input'">{{scope.row[item.prop]}}</div>
                  <!-- textarea -->
                  <el-input v-if="item.formType==='textarea' && item.inputStatus !== 'disable'" type="textarea"
                    v-model.trim="scope.row[item.prop]" :placeholder="item.placeholder" size="small"
                    :disabled="item.inputStatus === 'disable'" :maxlength="Number(item.maxlength)"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    :autosize="{ minRows: item.minRows, maxRows: item.maxRows}">
                  </el-input>
                  <div class="ellipsis smallFont grey"  v-else-if="item.formType==='textarea'">{{scope.row[item.prop]}}</div>
                  <!-- 数字 -->
                  <el-number v-if="item.formType==='number' && item.inputStatus !== 'disable'" controls-position="right" size="small"
                    :max="item.maxValue ? scope.row[item.maxValue] || 0 : item.max" :min="item.min" :disabled="item.inputStatus === 'disable'"
                    :maxlength="Number(item.maxlength)" :precision="Number(item.precision)"
                    v-model.trim="scope.row[item.prop]" :placeholder="item.placeholder"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    @change="handleChange(item, scope.row, $event, scope.$index)">
                  </el-number>
                  <div class="ellipsis smallFont grey" v-else-if="item.formType==='number'">{{scope.row[item.prop].toFixed(item.precision)}}</div>
                  <!-- 下拉选择框 -->
                  <el-select v-if="item.formType==='select' && item.inputStatus !== 'disable'" v-model.trim="scope.row[item.prop]"
                    :placeholder="item.placeholder" :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                    :filterable="item.filterable || true" style="width:100%"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    @change="handleChange(item, scope.row, $event, scope.$index)">
                    <el-option
                      v-for="(child,i) in item.selectList" :key="i"
                        :label="child[item.nameCode]"
                        :value="child[item.valueCode]">
                    </el-option>
                  </el-select>
                  <div class="ellipsis smallFont grey" v-else-if="item.formType==='select'">{{setDicData(scope.row[item.prop], item)}}</div>
                  <!-- 数据字典下拉选择框 -->
                  <el-select v-if="item.formType==='dicSelect' && item.inputStatus !== 'disable'" v-model.trim="scope.row[item.prop]"
                    :placeholder="item.placeholder" :size="item.size || 'small'"
                    :disabled="item.inputStatus === 'disable'"
                    :filterable="item.filterable || true" style="width:100%"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    @change="handleChange(item, scope.row, $event, scope.$index)">
                    <el-option v-for="(child,i) in item.selectList" :key="i"
                      :label="child.dataName"
                      :value="item.isNumber ? Number(child.dataCode) : child.dataCode">
                    </el-option>
                  </el-select>
                  <div class="ellipsis smallFont grey" v-else-if="item.formType==='dicSelect'">{{setDicData(scope.row[item.prop], item)}}</div>
                  <!-- checkbox -->
                  <el-checkbox v-if="item.formType==='checkbox'"
                    :disabled="item.inputStatus === 'disable'" v-model="scope.row[item.prop]">
                  </el-checkbox>
                  <!-- jsEditor -->
                  <el-input v-if="item.type==='jsEditor'"
                    :disabled="item.inputStatus === 'disable'" v-model.trim="scope.row[item.prop]"
                    placeholder="编辑JS" size="small" readonly>
                    <el-button style="margin-right: 5px;" slot="suffix" type="text" size="mini"
                      @click="handleJsEditor(scope.row, item, scope.$index)">
                      编辑
                    </el-button>
                  </el-input>
                  <!-- date time -->
                  <el-date-picker v-if="(item.formType==='date' || item.formType==='time') && item.inputStatus !== 'disable'"
                    v-model="scope.row[item.prop]" :placeholder="item.placeholder"
                    :size="item.size || 'small'" prefix-icon="icon"
                    :clearable="item.clearable === undefined ? true : item.clearable"
                    :disabled="item.inputStatus === 'disable'"
                    :picker-options="item.pickerOptions && pickerOptions"
                    :type="item.formType === 'date' ? 'date' : 'datetime'"
                    value-format='yyyy-MM-dd HH:mm:ss'
                    style="width: 100%;">
                  </el-date-picker>
                  <div class="ellipsis smallFont grey" v-else-if="(item.formType==='date' || item.formType==='time')">{{scope.row[item.prop] | systemFilters(item)}}</div>
                  <!-- 附件 attachment -->
                  <!-- {{pageDisabled}} -->
                  <upload-file v-if="item.formType==='attachment'"
                    :flowStatus="item.inputStatus !== 'disable' && !pageDisabled"
                    :limit="item.limit"
                    :multiple="item.multiple"
                    :attachment.sync="scope.row[item.prop]"
                  ></upload-file>
                  <!-- 按钮 -->
                  <div v-if="item.formType === 'operate'">
                    <template v-for="but in item.buts">
                      <el-button :key="but.id" v-if="but.show  || true"
                        :disabled="but.disabled || false" :class="but.class"
                        @click="setFn(but, scope.row)" type="text" size="mini" v-fast-click>
                        {{but.name}}
                      </el-button>
                    </template>
                    <slot name='table-buts' :scope="scope.row"></slot>
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      deleteList: [],
      jsEditorShow: false,
      jsCode: '',
      jsRow: '',
      jsRowCode: '',
      selectedUsers: [],
      tableChickList: [],
      toConfigure: {
        size: 'small', // 表格的尺寸
        border: false, // 是否显示边框
        stripe: false, // 是否显示斑马纹
        highlightCurrentRow: true, // 当前行高亮
        choice: 'checkbox', // radio => 单选  checkbox => 多选
        spanMethod: '', // 表格合并函数,
        getRowId: 'columnSource' // row-key
      },
      pageDisabled: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        }
      },
      btnParameter: {},
      dialogShow: false,
      fromData: [],
      slaveColumns: [],
      // 已选明细
      tableSelectList: [],
      localConfig: {
      }
    };
  },
  computed: {
    rule() {
      for (const i in this.tableConfig.rules) {
        const slaveColumn = this.tableConfig.slaveColumns.find(v => v.prop === i);
        const item = this.tableConfig.rules[i];
        item.forEach(v => {
            if (slaveColumn) {
              v.message = `${slaveColumn.label} 不能为空!`;
            } else {
              v.message = '不能为空!';
            }
        });
      }
      return {...this.tableConfig.rules, ...this.customRules};
    }
  },
  components: {
    uploadFile(resolve) {
      require(['components/basicComponents/global/upload/uploadFile.vue'], resolve);
    }
  },
  props: {
    tableConfig: {
      type: Object,
      default: () => {
        const params = {
          // 表头配置
          slaveColumns: [],
          // 校验
          rules: {},
          // 初始化行数据
          tableDataRow: {}
        };
        return params;
      }
    },
    tableData: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'add'
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    subTable: {
      type: Object,
      default: () => {}
    },
    customRules: {
      type: Object,
      default: () => {}
    },
    height: {
      type: Number,
      default: 400
    },
    getRowClassName: {
      type: Function
    }
  },
  watch: {
    tableConfig: {
      handler () {
        this.slaveColumns = this.tableConfig.slaveColumns;
      },
      deep: true
    }
  },
  created () {
    this.params = this.$route.params;
  },
  mounted () {
    if (this.tableConfig) {
      this.slaveColumns = this.tableConfig.slaveColumns;
    }
    this.pageDisabled = this.type === 'info';
  },
  methods: {
    btnFn (fnName) {
      this[fnName]();
    },
    setFn (btnParameter, row) {
      const params = {
        btnParameter,
        row
      };
      this.$emit('editTableEvent', {eventName: 'fnRowName', params});
      this.$emit('fnRowName', [btnParameter, row]);
    },
    // 批量删除选中
    selectionChange (val) {
      this.deleteList = val;
      this.$emit('update:delete', this.deleteList);
    },
    // 无验证子表数据返回
    getTableData () {
      const tableData = JSON.parse(JSON.stringify(this.subTable.tableData));
      if (tableData.length > 0) {
        return true;
      } else {
        return false;
      }
    },
    // 选中
    handleChange (item, row, event, rowIndex) {
      const params = {
        item,
        row,
        event,
        subTable: this.subTable,
        rowIndex
      };
      if (item.isRelation) { // 下拉选择赋值
        this.$emit('editTableEvent', {eventName: 'tableSelect', params});
      }
      if (item.operateData) {
        this.$emit('editTableEvent', {eventName: 'operateDataEvent', params});
        this.$emit('operateDataEvent', {item, row, event, tableData: this.subTable.tableData, rowIndex});
      }
    },
    // 表格内文本操作时间
    handleTable(item, row, event, rowIndex) {
      const params = {
        item,
        row,
        event,
        subTable: this.subTable,
        rowIndex
      };
      this.$emit('editTableEvent', {eventName: 'handleTable', params});
    },
    // 数据字典
    setDicData (value, item) {
      const index = item.selectList && item.selectList.findIndex(v => (item.isNumber ? Number(v.dataCode) : v.dataCode) === value);
      if (index < 0) return '';
      return item.selectList[index].dataName;
    },
    // 清空
    clearSelectionTable() {
      this.$refs.multipleTable.clearSelection();
    },
    // 验证子表数据
    validateTableData (callback) {
      this.$refs.multipleTable.clearSelection();
      if (this.subTable.tableData.length === 0) {
        return [];
      }
      let data = false;
      this.$refs.editTable.validate(valid => {
        if (valid) {
          const tableConfig = JSON.parse(JSON.stringify(this.slaveColumns));
          const tableData = JSON.parse(JSON.stringify(this.subTable.tableData));
          for (const i in tableConfig) {
            const item = tableConfig[i];
            for (const i in tableData) {
              const row = tableData[i];
              // checkbox
              if (item.type === 'checkbox') {
                row[item.prop] = row[item.prop] ? 1 : 0;
              }
              // 唯一
              if (item.isRepeat) {
                const repeatList = this.arrTest(this.subTable.tableData, item.prop);
                if (repeatList.length > 0) {
                  // 重复，请重新输入
                  this.$message.error(`${this.item.label}重复，请重新输入！`);
                  this.toggleSelection(repeatList, 'multipleTable');
                  return false;
                }
              }
            }
          }
          data = JSON.parse(JSON.stringify(tableData));
          callback && callback(data);
        } else {
          data = false;
        }
      });
      return data;
    },
    // 判断是否重复
    arrTest (arr, key) {
      const list = [];
      const repeatList = [];
      for (const i in arr) {
        const item = arr[i];
        if (list.some(v => v[key] === item[key])) {
          repeatList.push(item);
        } else {
          list.push(item);
        }
      }
      return repeatList;
    },
    // 勾选
    toggleSelection (rows, formName) {
      if (rows) {
        rows.forEach(row => {
          this.$refs[formName].toggleRowSelection(row, true);
        });
      } else {
        this.$refs[formName].clearSelection();
      }
    }
  }
};

</script>
<style lang="scss" scoped>
  .editTable {
    flex: 1;
    margin-bottom: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .detailedTable {
      flex: 1;
    }
    /deep/ .el-input--small .el-input__inner{
        line-height: 34px !important;
        height: 34px !important;
    }
    /deep/ .cell {
      display: flex;
    }
    /deep/ .el-table__expand-icon {
      position: relative;
      top: 10px;
    }
    /deep/ .el-form-item {
      width: 100%;
    }
  }

  .jsDialog {
    padding: 10px;
    min-height: 400px;

    .footer {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      font-size: 14px;
    }
  }

  .databaseFields {
    padding: 10px;

    .footer {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 45px;
      line-height: 45px;
      padding: 0 15px;
      font-size: 14px;
    }
  }

</style>
