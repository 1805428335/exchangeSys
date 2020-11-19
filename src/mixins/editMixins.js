/*
 * @Author: your name
 * @Date: 2020-07-13 09:00:27
 * @LastEditTime: 2020-11-19 17:28:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_unit\src\mixins\editMixins.js
 */
import {closeRoute} from 'mixins/index';
import Auth from 'util/auth';

export const editPage = {
  mixins: [closeRoute],
  data () {
      return {
        pageConfig: {},
        type: 'add',
        id: 0,
        dialogVisible: false,
        deleteList: {},
        pageDisabled: false,
        loading: false,
        pageConfigLoading: true,
        isProcess: false,
        pageData: '',
        subTableData: [],
        oldProjectForm: {},
        cloneProjectForm: {}
      };
  },
  created () {
    if (this.$route.name === 'processApprovalPage') {
      this.type = this.$base64.decode(this.$route.params.type);
      this.isProcess = true;
    } else {
      if (!this.$route.params.type) return;
      this.type = this.$base64.decode(this.$route.params.type);
      this.id = Number(this.$base64.decode(this.$route.params.id));
      this.cloneProjectForm = this.$clone(this.projectForm);
      if (this.page) {
        if (this.type !== 'add') {
          this.pageConfig.projectForm = this.projectForm; // 挂载form 对象
          this._getInfoData(this.id);
        } else {
          this.pageConfig = this.page.PageConfig;
          this.pageConfig.projectForm = this.projectForm; // 挂载form 对象
          this.oldProjectForm = this.$clone(this.projectForm);
          if (this.pageConfig.subTableMatch) {
            for (const item of this.pageConfig.subTableMatch) {
              this.$set(this.pageConfig.subTableConfig[item.assignment], 'tableData', this.$clone(this.subTableData));
            }
          }
          this.pageConfigLoading = true;
        }
      }
    }
    this.pageStatus();
  },
  activated() {
    if (this.page) {
      this.page.init();
      this.pageConfig = this.page.PageConfig;
    }
  },
  methods: {
    // 校验
    repeatCheckData(rule, value, callback, params) {
      if (!value) {
        // 请输入
        callback(new Error(`${this.$t('tips.pleaseEnter')}${this.$t(params.codeName)}`));
      } else {
        this.$store.dispatch(params.url, {[params.keyName]: value, [params.keyId]: this.id || ''}).then(res => {
            if (res.results) {
                // 重复，请重新输入
                callback(new Error(`${this.$t(this.$t(params.codeName))}${this.$t('tips.repeat')}`));
            } else {
                callback();
            }
        });
      }
    },
    // 获取数据
    handleGetInfoData(id = 0, infoUrl, callback) {
      if (Number(id) === 0) {
        this.pageConfig.projectForm = this.projectForm; // 挂载form 对象
        this.pageConfigLoading = true;
        return;
      }
      this.id = id;
      this.loading = true;
      this.$store.dispatch(infoUrl.url, {[infoUrl.params]: this.id}).then(res => {
          const results = this.$clone(res.results);
          if (!results) {
            this.pageConfig = this.page.PageConfig;
            this.pageConfig.projectForm = this.projectForm; // 挂载form 对象
            this.pageConfigLoading = true;
            this.loading = false;
            return;
          }
          if (results.continent) {
            results.areas = [];
            const keysList = ['continent', 'country', 'province', 'city', 'area'];
              for (const key of keysList) {
              if (results[key] && results[key].indexOf('-')) {
                  const id = results[key].split('-')[1];
                  results.areas.push(Number(id));
              }
            }
          } else if (!results.continent && results.province) {
            results.areas = [];
            const keysList = ['province', 'city', 'area'];
              for (const key of keysList) {
              if (results[key] && results[key].indexOf('-')) {
                  const id = results[key].split('-')[1];
                  results.areas.push(id);
              }
            }
          }
          this.pageConfig = this.page.PageConfig;
          this.$set(this.pageConfig, 'projectForm', results);
          this.oldProjectForm = this.$clone(results);
          if (this.pageConfig.subTableMatch) {
            for (const item of this.pageConfig.subTableMatch) {
              this.$set(this.pageConfig.subTableConfig[item.assignment], 'tableData', results[item.value]);
              if (this.pageConfig.subTableConfig[item.assignment].isSetTableStatus) {
                // this.setSysHandleExportDetailStatus(item.assignment);
              }
            }
          }
          callback && callback();
          this.pageConfigLoading = true;
          this.loading = false;
      });
    },
    // 设置导入明细按钮状态
    setSysHandleExportDetailStatus(tableName) {
      if (this.type !== 'info') return;
      const subTableButton = this.pageConfig.subTableConfig[tableName].subTableButton;
      const index = subTableButton.findIndex(v => v.code === 'sysHandleExportDetail');
      if (index >= 0) {
        this.$set(this.pageConfig.subTableConfig[tableName].subTableButton[index], 'disabled', false);
      }
      this.$forceUpdate();
    },
    // 保存数据
    handleSaveData (data, isProcess = false, callback) {
      if (!isProcess) {
        this.saveData(data, isProcess, callback);
        return;
      }
      this.pageData = this.$clone(data);
      this.handleProcess();
    },
    // 保存数据
    saveData(data, isProcess, callback) {
      const saveUrl = this.page.PageConfig.processParmas.saveUrl;
      this.$store.dispatch(saveUrl.url, data).then(res => {
          const status = this.type === 'add' ? '添加' : '修改';
          if (res.status === 0) {
            if (!isProcess) {
              this.$message.success(`${status}成功!`);
              this.setRoute();
              return;
            }
            callback && callback();
          } else {
            this.$message.error(`${status}失败!`);
          }
      });
    },
    handleProcess() {
      this.$emit('processSubmit', true);
    },
    // 页面状态
    pageStatus() {
      this.pageDisabled = this.type !== 'info';
      if (this.type === 'info') {
        for (const i in this.page.PageConfig.subTableConfig) {
          const item = this.page.PageConfig.subTableConfig[i];
          for (const but of item.subTableButton) {
            but.disabled === undefined ? (but.disabled = false) : (but.disabled = true);
          }
        }
      }
    },
    editEvent(eventName) {
      if (eventName === 'close') {
        this.setRoute();
      }
      if (eventName === 'save') {
        this.handleSave();
      }
      if (eventName === 'reset') {
        this.handleReset();
      }
    },
    // 重置
    handleReset() {
      for (const key in this.cloneProjectForm) {
        this.$set(this.pageConfig.projectForm, key, this.cloneProjectForm[key]);
      }
    },
    // ------------------------------------- 主表 ----------------------------------------------------
    // 获取编辑表单的项目
    editFormEvent({eventName, params}) {
      if (eventName === 'operateFun') {
        this[params.operateFun] && this[params.operateFun](params);
      }
      if (eventName === 'clearUser') { // 清除用户
        this.handleClearUser(params);
      }
      if (eventName === 'user') { // 获取用户
        this.handleSelectUser(params);
      }
      if (eventName === 'identify') { // 自动识别
        this.handleIdentify(params);
      }
    },
    // 自动识别附件
    handleIdentify(params) {

    },
    // ----------------------------- 员工 ---------------------------------
    // 清除员工
    handleClearUser(params) {
      this.handleSelectUser({selectList: [], paramsConfig: params});
    },
    // 选择子工程
    handleSelectUser(params) {
      this.handleSelect(params, 'userName');
    },
    // ----------------------------- 其他与子表关联 -------------------------------
    // 下拉选择框
    handleOtherSelect(params) {
      const arr = params.selectList;
      const item = params.paramsConfig;
      const oldRelationForm = params.oldRelationForm;
      const oldProjectForm = this.oldProjectForm;
      let isTableList = false;
      if (!item.isRelationTable && (!item.relationTable || item.relationTable.length === 0)) {
        this.setSelectValue(item, this.pageConfig.projectForm[item.prop]);
        return;
      }
      for (const table of item.relationTable) {
        if (this.pageConfig.subTableConfig[table].tableData.length) {
          isTableList = true;
        }
      }
      if (oldProjectForm[item.prop] && isTableList) {
        const m = "更改已选{keyValue}将会删除已选明细, 是否继续?<br><span style='color:red'>删除数据后无法找回，请谨慎考虑是否删除！</span>";
        const deletMessage = m.replace('{keyValue}', this.$t(`${item.label}`));
        this.$confirm(deletMessage, '数据变更提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取 消',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          for (const table of item.relationTable) {
            this.deleteDetail(table);
          }
          this.setSelectValue(item, this.pageConfig.projectForm[item.prop]);
        }).catch(() => {
          this.$set(this.pageConfig.projectForm, item.prop, oldProjectForm[item.prop] || ''); // 显示值
          this.setSelectValue(item, this.pageConfig.projectForm[item.prop], false); //
        });
      } else {
        this.setSelectValue(item, this.pageConfig.projectForm[item.prop]);
      }
    },
    // 下拉框联动赋值
    setSelectValue(item, event, cancleFlag = true) {
      this.$set(this.oldProjectForm, item.prop, event);
      if (item.isRelation) {
        item.relationList && item.relationList.forEach(row => {
          let index = 0;
          if (item.formType === 'select') {
            index = item.selectList.findIndex(v => v[item.valueCode] === event);
          } else {
            index = item.selectList.findIndex(v => v.dataCode === event);
          }
          this.$set(this.pageConfig.projectForm, row.receive, item.selectList[index] && item.selectList[index][row.value] || ''); // 显示值
          this.$set(this.oldProjectForm, row.receive, item.selectList[index] && item.selectList[index][row.value] || ''); // 显示值
        });
      }
      if (item.otherOperate && cancleFlag) {
        item.otherOperateFun && this[item.otherOperateFun]();
      }
    },
    // ----------------------------- 使用弹出框选择后的一系列赋值操作 -------------------------------
    // 确认选择
    handleSelect(params, displayValue, callback) {
      const arr = params.selectList;
      const item = params.paramsConfig;
      // 关联子表时
      if (item.relationTable && item.relationTable.length) {
        let isTableList = false;
        for (const table of item.relationTable) {
          if (this.pageConfig.subTableConfig[table].tableData.length) {
            isTableList = true;
          }
        }
        if (this.pageConfig.projectForm[item.prop] && isTableList) {
          this.selectChange(item, arr, displayValue, callback);
        } else {
          this.setRelationData(item, arr, displayValue, callback);
        }
      } else {
        this.setRelationData(item, arr, displayValue, callback);
      }
    },
    // 选择 关联明细删除提示
    selectChange(item, arr, displayValue, callback) {
      const m = "更改已选{keyValue}将会删除已选明细, 是否继续?<br><span style='color:red'>删除数据后无法找回，请谨慎考虑是否删除！</span>";
      const deletMessage = m.replace('{keyValue}', this.$t(`fConfig.${displayValue}`));
      this.$confirm(deletMessage, '数据变更提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取 消',
        dangerouslyUseHTMLString: true,
        type: 'warning'
      }).then(() => {
        for (const table of item.relationTable) {
          this.deleteDetail(table);
        }
        this.setRelationData(item, arr, displayValue, callback);
      }).catch(() => {
      });
    },
    // 主表联动赋值
    setRelationData(item, arr, displayValue, callback) {
      this.$set(this.pageConfig.projectForm, item.prop, arr.length > 0 ? arr[0][displayValue] : ''); // 显示值
      this.$set(this.pageConfig.projectForm, item.key, arr.length > 0 ? arr[0].id : ''); // 关键值
      if (item.isRelation) {
        item.relationList.forEach(row => {
          if (row.isAddress) {
            // 获取详细地址
            let address = '';
            if (arr.length > 0) {
                const province = arr[0].province && arr[0].province.split('-')[0];
                const city = arr[0].city && arr[0].city.split('-')[0];
                const area = arr[0].area && arr[0].area.split('-')[0];
                address = `${province}${city}${area}`;
            }
            this.$set(this.pageConfig.projectForm, row.receive, arr.length > 0 ? address : ''); // 显示值
          } else if (row.areaCode) {
            // 货取地址代码
            const areas = [];
            const keysList = ['province', 'city', 'area'];
            for (const key of keysList) {
              if (arr[0][key] && arr[0][key].indexOf('-')) {
                  const id = arr[0][key].split('-')[1];
                  areas.push(id);
              }
              this.$set(this.pageConfig.projectForm, key, arr[0][key] ? arr[0][key] : ''); // 显示值
            }
            this.$set(this.pageConfig.projectForm, row.receive, arr.length > 0 ? areas : ''); // 显示值
          } else {
            let value = '';
            if (arr.length) {
              value = arr[0][row.value] === undefined ? '' : arr[0][row.value];
            } else {
              value = '';
            }
            this.$set(this.pageConfig.projectForm, row.receive, value); // 显示值
          }
        });
      }
      if (item.clearRelation && item.clearRelation.length) {
        this.clearRelationData(item.clearRelation);
      }
      callback && callback();
    },
    // 清除相关连动数据
    clearRelationData(clearList) {
      for (const v of clearList) {
        const index = this.pageConfig.mainFormConfig.formList.findIndex(item => item.prop === v.prop);
        if (index >= 0) {
          this[v.clearFun] && this[v.clearFun](this.pageConfig.mainFormConfig.formList[index]);
        }
      }
    },

    // -------------------------------------------- 子表 ----------------------------------------
    // 子表事件按钮事件传出
    mainOperateBtnSubTable(parameter) {
      this[parameter.code](parameter.subTableCode);
    },
    // 导出明细
    sysHandleExportDetail(tableName) {
      if (this.type !== 'info') {
          this.$message.info('查看时可导出');
          return;
      }
      const exportParams = {
          url: this.page.PageConfig.processParmas.exportDetail.url,
          params: {
              [this.page.PageConfig.processParmas.exportDetail.params]: this.id
          }
      };
      this.handleExportDetail(exportParams);
    },
    // 导出明细列表操作
    handleExportDetail(exportParams, tableName) {
      const tranSlateName = this.$route.meta.title;
      this.$store.dispatch(exportParams.url, exportParams.params).then(data => {
        if (!data) return;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', `${tranSlateName} 明细清单列表.xls`);
        document.body.appendChild(link);
        link.click();
      });
    },
    // 添加明细
    sysHandleDeletaAdd(tableName) {
      if (this.tableRow) {
        this.pageConfig.subTableConfig[tableName].tableData.push(this.$clone(this.tableRow));
        return ;
      }
      const tableDataRow = this.$clone(this.pageConfig.subTableConfig[tableName].tableList.tableDataRow);
      this.pageConfig.subTableConfig[tableName].tableData.push(tableDataRow);
    },
    // 批量删除
    sysHandleDeletaBatch(tableName, otherOperate) {
      if (otherOperate) {
        this.handleDeleteSubTable(Array.from(this.pageConfig.subTableConfig[tableName].tableData), this.$t(`${this.$route.meta.title}`), tableName);
      } else {
        if (this.deleteList[tableName] && this.deleteList[tableName].length) {
          this.handleDeleteSubTable(this.deleteList[tableName], this.$t(`${this.$route.meta.title}`), tableName);
        } else {
          this.$message.error(this.$t('tips.pleaseSelectDetailed'));
        }
      }
    },
    // 批量删除操作
    handleDeleteSubTable(arr, keyValue, tableName) {
        if (arr && arr.length > 0) {
            const deletMessage = this.$t('tips.deleteDetailedTips').replace('{keyValue}', keyValue);
            const deleteDetailsMessage = this.$t('tips.deleteDetailsApiTips').replace('{keyValue}', keyValue);
            let messageTips = deletMessage;
            (this.pageConfig.processParmas.deleteDetailsParams && this.pageConfig.processParmas.deleteDetailsParams.url) && (messageTips = deleteDetailsMessage);
            this.$confirm(messageTips, `${this.$t('button.batchDeletion')}${keyValue}`, {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              cancelButtonText: '取 消',
              type: 'warning'
            }).then(() => {
              this.deleteDetail(tableName, arr);
            }).catch(e => {});
        } else {
          // 请选择明细清单
          arr && this.$message.error(this.$t('tips.pleaseSelectDetailed'));
        }
    },
    deleteDetail(tableName, deleteList) {
      if (!deleteList) {
        deleteList = Array.from(this.pageConfig.subTableConfig[tableName].tableData);
      }
      deleteList.forEach(v => {
          this.pageConfig.subTableConfig[tableName].tableData.splice(this.pageConfig.subTableConfig[tableName].tableData.indexOf(v), 1);
      });
      if (this.pageConfig.processParmas.deleteDetailsParams && this.pageConfig.processParmas.deleteDetailsParams.url) {
        const deleteDetailsParams = this.pageConfig.processParmas.deleteDetailsParams;
        const deleteIds = deleteList.filter(v => v.id).map(i => i.id);
        deleteIds.length && this.$store.dispatch(deleteDetailsParams.url, deleteIds).then(res => {
          if (res.status === 0) {
            this.$message.success('删除成功!');
          } else {
            this.$message.error('删除失败!');
          }
        });
      }
      this.$refs[tableName][0].clearSelectionTable();
      // 删除后的数值计算回调
      this.deletTableCallback && this.deletTableCallback(tableName);
    },
    // 子表操作事件
    editTableEvent({eventName, params}) {
      if (eventName === 'tableSelect') { // 下拉选择
        this.handleTableSelect(params);
      }
      if (eventName === 'operateDataEvent') { // 数值计算
        this.handleCalculation(params);
      }
      if (eventName === 'handleTable') { // 表格文本操作事件
        params.item && params.item.fn && params.item.fn(params);
      }
      if (eventName === 'fnRowName') { // 表格操作按钮
        const {btnParameter, row} = params;
        btnParameter.fn && this[btnParameter.fn](row);
      }
    },
    // 子表下拉选择赋值
    handleTableSelect({item, row, event, subTable, rowIndex}) {
      item.relationList.forEach(res => {
        let index = 0;
        if (item.formType === 'select') {
          index = item.selectList.findIndex(v => v[item.valueCode] === event);
        } else {
          index = item.selectList.findIndex(v => v.dataCode === event);
        }
        this.$set(this.pageConfig.subTableConfig[subTable.subTableName].tableData[rowIndex], res.receive, item.selectList[index][res.value]);
      });
    },
    // 数值计算
    handleCalculation(params) {
      console.log(params);
    },
    // 行内样式表格方法
    getRowClassName({row, rowIndex}) {
      if (!this.checkRow(row)) {
        return '';
      } else { // 返回true 则爆红
        return 'error-active';
      }
    },
    // 明细模板下载
    sysHandleDownloadTemplate() {
      const tranSlateName = this.$route.meta.title;
      const tableName = this.page.PageConfig.processParmas.dowanloadDetail.tableName;
      const table = `${tranSlateName}.${tableName}`;
      console.log(this.$t(table));
      this.$store.dispatch(this.page.PageConfig.processParmas.dowanloadDetail.url).then(data => {
          if (!data) return;
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.setAttribute('download', `${this.$t(tranSlateName)} ${this.$t(table)} ${this.$t('fConfig.excel')}.xls`);
          document.body.appendChild(link);
          link.click();
      });
    }
  }
};
