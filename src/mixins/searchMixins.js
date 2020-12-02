/*
 * @Author: your name
 * @Date: 2020-06-28 09:08:48
 * @LastEditTime: 2020-11-19 17:06:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_basicconfiguration-施工云企业信息及配置\src\mixins\searchMixins.js
 */
import Auth from 'util/auth';
import {freshList} from './index';

export const search = {
  mixins: [freshList],
  data () {
    return {
      total: 0,
      pageSize: 10,
      pageNo: 1,
      tableHeight: 400,
      loading: false,
      queryLoading: false,
      searchData: {},
      cloneSearchData: {}
    };
  },
  created () {
    if (this.page) {
      if (this.searchData.flowStatus !== undefined) {
        if (this.searchData.flowStatus === '') {
          this.searchData.flowStatus = [];
        }
      }
      this.cloneSearchData = this.$clone(this.searchData);
      this.pageConfig = this.page.PageConfig;
      this.pageConfig.mainTable.tableData = [];
      this.pageConfig.searchControls.searchData = this.searchData;
    }
  },
  activated() {
    if (this.page) {
      this.page.init();
      this.pageConfig = this.page.PageConfig;
    }
  },
  mounted () {
      this.$nextTick(() => {
          const consHeight = this.$refs.table_cons ? this.$refs.table_cons.offsetHeight : 522;
          const buttonListHeight = 60; // 按钮高度
          const pageHeight = 60; // 分页高度
          const tableHeight = consHeight - buttonListHeight - pageHeight ; // 20 位 padding 高度
          this.tableHeight = tableHeight;
        });
  },
  methods: {
    // 根据url获取数据
    handleGetTableDataList(url, paging = true, callBack) {
      this.loading = true;
      const data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.pageConfig.searchControls.searchData
      };
      this.$store.dispatch(url, data).then(res => {
        if (res.status === 0) {
          if (paging) {
            this.pageConfig.mainTable.tableData = res.results ? res.results.records : [];
            this.pageConfig.mainTable.total = res.results ? res.results.total : 0;
          } else {
            this.pageConfig.mainTable.tableData = res.results ? res.results : [];
          }
          callBack && callBack();
        } else {
          this.$message.error(this.$t(`exception.${res.errorCode}`));
        }
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    },
    // 打印标签按钮
    sysHandlePrintLabel() {
      if (this.tableSeleList.length === 0) {
        this.$message({
          message: this.$t('print.selePrintLabelTips'),
          type: 'info'
        });
        return;
      }
      if (this.tableSeleList[0].flowStatus === '0') {
        this.$message({
          message: this.$t('print.printProcessNot'),
          type: 'info'
        });
        return;
      }
      if (this.tableSeleList[0].flowStatus === '01') {
        this.$message({
          message: this.$t('print.dataApproval'),
          type: 'info'
        });
        return;
      }
      const infoUrl = this.pageConfig.processParmas.infoUrl;
      this.$store.dispatch(infoUrl.url, {[infoUrl.params]: this.tableSeleList[0].id}).then(res => {
        if (res.status === 0) {
          this.setPrintLabelDetail && this.setPrintLabelDetail(res.results);
        }
      });
    },
    // 行内样式表格方法
    getRowClassName({row, rowIndex}) {
      if (!this.checkRow(row)) {
        return '';
      } else { // 返回true 则爆红
        return 'error-active';
      }
    },
    // 表格数据字典
    setDicData (value, selectList) {
      const index = selectList && selectList.findIndex(v => v.dataCode === value);
      if (index < 0) return '';
      return selectList[index].dataName;
    },
    // 获取搜索条件
    setSearchForm (parameter) {
      return parameter;
    },
    // 重置搜索条件
    emptyForm (formName) {
      this.$refs[formName].resetFields();
      this.$set(this.pageConfig.searchControls, 'searchData', this.$clone(this.cloneSearchData));
      this.handleSearch();
    },
    // 搜索
    handleSearch () {
      if (this.$refs.Page) {
        this.$refs.Page.setCurrentPage();
      } else {
        this._getTableDataList();
      }
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
    setFnName ({fn, row, index}) {
      this[fn](row, index);
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
    },
    // 页面查询按钮
    butFnName (fnName) {
      this[fnName]();
    },
    // 组件查询页面
    // 获取搜索数据
    searchEvent({eventName, params}) {
      if (eventName === 'clear') {
        for (const key in this.cloneSearchData) {
          this.$set(this.pageConfig.searchControls.searchData, key, this.cloneSearchData[key]);
        }
      }
      for (const item of this.pageConfig.searchControls.formList) {
        if (item.formType === 'daterange-split' && item.type !== 'time') {
          const value = this.pageConfig.searchControls.searchData[item.propEnd];
          this.pageConfig.searchControls.searchData[item.propEnd] = value ? value.replace('00:00:00', '23:59:59') : '';
        }
      }
      for (let i = 0; i < this.$children.length; i++) {
        if (this.$children[i].$el && this.$children[i].$el.className === 'generalPage') {
          this.$children[i].$refs.Page && this.$children[i].$refs.Page.setCurrentPage();
        }
      }
      this._getTableDataList();
    },
    getSearchData (searchData) {
        this.pageConfig.searchControls.searchData = searchData;
        this._getTableDataList();
    },
    // 操作按钮
    pageConfigBtnFnName (fnName) {
        this[fnName]();
    },
    // 子表行操作按钮
    pageConfigEmitQueryTableButtonFnName ({ row, btnParameter }) {
        if (btnParameter.fn) {
            this[btnParameter.fn](row);
        }
    },
    // 列的显示与隐藏
    pageConfigResetTableConfigList (list) {
        this.pageConfig.mainTable.tableList = JSON.parse(JSON.stringify(list));
    },
    // 刷新
    pageConfigOnRefresh () {
      this._getTableDataList();
    },
    // 分页
    pageConfigPages ({pageSize, pageNo}) {
      this.pageSize = pageSize;
      this.pageNo = pageNo;
      this._getTableDataList();
    },
    // 增、改、查 路由跳转设置
    handleSetRouter(type, row = {}) {
      if (row.id) {
        if (!this.judgeSamePerson(row) && type === 'edit') {
          this.editError('修改');
          return;
        }
      }
      const translateType = type;
      type = this.$base64.encode(type);
      const id = this.$base64.encode(row.id || 0);
      const RouteTitleObj = {name: `${this.$route.name}Edit`, loadRouteName: this.$route.name, translateType};
      localStorage.setItem('RouteTitle', JSON.stringify(RouteTitleObj));
      this.$router.push(`/${this.$route.name}Edit/${type}/${id}`);
    },
    // 添加
    sysHandleAdd() {
      this.handleSetRouter('add', {});
    },
    // 修改
    handleEdit(row) {
      this.handleSetRouter('edit', row);
    },
    // 查看
    handleInfo(row) {
      this.handleSetRouter('info', row);
    },
    // 保存数据
    handleSaveData (data) {
      const saveUrl = this.page.PageConfig.processParmas.saveUrl;
      this.$store.dispatch(saveUrl.url, data).then(res => {
          const status = this.type === 'add' ? '添加' : '修改';
          if (res.status === 0) {
            this._getTableDataList();
            this.$message.success(`${status}成功!`);
          } else {
            this.$message.error(`${status}失败!`);
          }
      });
    },
    // 流程监控
    sysHandleMonitorProcess(row) {},
    // 禁用/启用
    // statusConfig = {
    //   keyId: 'unitPartyATypeId',
    //   keyName: 'partyATypeName',
    //   row,
    //   api: 'partyAType/partyATypeDisable'
    // }
    setDataStatus(statusConfig) {
      const statusTips = statusConfig.row.status === 0 ? '禁用' : '启用';
      const status = statusConfig.row.status === 0 ? 1 : 0;
      this.$confirm(`${statusTips} ${statusConfig.row[statusConfig.keyName]}?`, statusTips, {
        confirmButtonText: '确定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
      .then(() => {
        this.$store.dispatch(statusConfig.api, {[statusConfig.keyId]: statusConfig.row.id, status}).then(res => {
          if (res.status === 0) {
            this._getTableDataList();
            this.$message.success(`${statusTips}成功!`);
          } else {
            this.$message.error(`${statusTips}失败!`);
          }
        });
      })
      .catch(() => {});
    },
    // 删除
    setDataDelete(statusConfig, row) {
      if (!this.judgeSamePerson(row) && statusConfig.isCreate !== false) {
        this.editError('删除');
        return;
      }
      this.$confirm(`删除 ${statusConfig.row[statusConfig.keyName]}?`, '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取 消',
        type: 'warning'
      })
      .then(() => {
        this.$store.dispatch(statusConfig.api, {[statusConfig.keyId]: statusConfig.row.id}).then(res => {
          if (res.status === 0) {
            this._getTableDataList();
            this.$message.success('删除成功!');
          } else {
            this.$message.error('删除失败!');
          }
        });
      })
      .catch(() => {});
    },
    judgeSamePerson(row) {
      const createBy = row.createBy;
      const userId = Auth.hasUserInfo().userId;
      return createBy === userId;
    },
    editError(key) {
      this.$message({
        message: `${this.$t('tips.notCreatedByMyself')}${key}`,
        type: 'error'
      });
    },
    dialogEvent(event) {
      if (event === 'close') {
        this.$emit('update:close', false);
      } else {
        this.$emit('getData', this.tableSeleList);
      }
    },
    // 导出
    sysHandleExport() {
      if (this.pageConfig.mainTable.tableData.length === 0) return;
      const data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.pageConfig.searchControls.searchData
      };
      const exportUrl = this.pageConfig.processParmas.exportUrl.url;
      if (!exportUrl) return this.$message.error(this.$t('tips.exportUrlError'));
      this.$store.dispatch(exportUrl, data).then(data => {
        if (!data) return;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        let fileName = '';
        if (this.$route.name.indexOf('Edit') >= 0) {
          const index = this.$store.state.tagNav.cachedPageList.findIndex(v => v.name === this.$route.name);
          if (index >= 0) {
            const tag = this.$store.state.tagNav.cachedPageList[index];
            fileName = `${this.$t(`menu.${tag.loadRouteName}`)} ${this.$t(`button.${tag.translateType}`)}`;
          } else {
            fileName = `${this.$t(`menu.${this.$route.name}`)}`;
          }
        } else {
          fileName = `${this.$t(`menu.${this.$route.name}`)}`;
        }
        console.log(fileName);
        link.setAttribute('download', `${fileName}${this.$t('fConfig.excel')}.xls`);
        document.body.appendChild(link);
        link.click();
      });
    },
    // 导出
    handleExport(url) {
      if (this.pageConfig.mainTable.tableData.length === 0) return;
      const data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          ...this.pageConfig.searchControls.searchData
      };
      this.$store.dispatch(url, data).then(data => {
        if (!data) return;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        let fileName = '';
        if (this.$route.name.indexOf('Edit') >= 0) {
          const index = this.$store.state.tagNav.cachedPageList.findIndex(v => v.name === this.$route.name);
          if (index >= 0) {
            const tag = this.$store.state.tagNav.cachedPageList[index];
            fileName = `${this.$t(`menu.${tag.loadRouteName}`)} ${this.$t(`button.${tag.translateType}`)}`;
          } else {
            fileName = `${this.$t(`menu.${this.$route.name}`)}`;
          }
        } else {
          fileName = `${this.$t(`menu.${this.$route.name}`)}`;
        }
        console.log(fileName);
        link.setAttribute('download', `${fileName}${this.$t('fConfig.excel')}.xls`);
        document.body.appendChild(link);
        link.click();
      });
    },
    // 下载模板
    handleDownloadTemplate(url, templateName) {
      this.$store.dispatch(url).then(data => {
        if (!data) return;
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', `${this.$t(templateName)}${this.$t('fConfig.excel')}.xls`);
        document.body.appendChild(link);
        link.click();
      });
    },
    // 打印
    sysHandlePrint() {
      if (this.tableSeleList.length === 0) {
        this.$message({
          message: '请您先选中想要进行打印的一行数据。',
          type: 'info'
        });
        return;
      }
      const row = this.tableSeleList[0];
      const printModelCode = this.$base64.encode(this.pageConfig.formCode);
      const taskId = this.$base64.encode(row.taskId); // 打印
      const id = this.$base64.encode(row.id);
      const RouteTitleObj = {name: 'printDesign', loadRouteName: this.$route.name, translateType: 'print'};
      localStorage.setItem('RouteTitle', JSON.stringify(RouteTitleObj));
      this.$router.push(`/printDesign/${printModelCode}/${taskId}/${id}/${this.$route.name}`);
    },
    // ----------------------------- 使用弹出框选择后的一系列赋值操作 -------------------------------
    editFormEvent({eventName, params}) {
      if (eventName === 'clearProjcet') {
        this.handleClearProject(params);
      }
      if (eventName === 'projcet') {
        this.handleSelectProject(params);
      }
      if (eventName === 'clearPartyA') {
        this.handleClearPartyA(params);
      }
      if (eventName === 'partyA') {
        this.handleSelectPartyA(params);
      }
      if (eventName === 'clearPartyB') {
        this.handleClearPartyB(params);
      }
      if (eventName === 'partyB') {
        this.handleSelectPartyB(params);
      }
      if (eventName === 'operateFun') {
        this[params.operateFun] && this[params.operateFun](params);
      }
      if (eventName === 'clearUser') { // 清除用户
        this.handleClearUser(params);
      }
      if (eventName === 'user') { // 获取用户
        this.handleSelectUser(params);
      }
    },
    // 清除项目
    handleClearProject(params) {
      if (params.item && params.item.formType === 'multipleProject') {
        const projectList = this.projectForm[params.item.prop];
        projectList.splice(projectList.indexOf(params.tag), 1);
        return;
      }
      this.handleSelectProject({selectList: [], paramsConfig: params});
    },
    // 选择项目
    handleSelectProject(params) {
      if (params.paramsConfig.check) {
        this.handleCheckProject && this.handleCheckProject(params);
        return;
      }
      // 多选项目
      if (params.paramsConfig.formType === 'multipleProject') {
        this.$set(this.projectForm, params.paramsConfig.prop, this.$clone(params.selectList));
        return;
      }
      this.handleSelect(params, 'projectName');
    },
    // ----------------------------- 甲方单位 -------------------------------
    // 清除甲方单位
    handleClearPartyA(params) {
      this.handleSelectPartyA({selectList: [], paramsConfig: params});
    },
    // 选择甲方单位
    handleSelectPartyA(params) {
      this.handleSelect(params, 'partyAName');
    },
    // ----------------------------- 乙方单位 -------------------------------
    // 清除甲方单位
    handleClearPartyB(params) {
      this.handleSelectPartyB({selectList: [], paramsConfig: params});
    },
    // 选择甲方单位
    handleSelectPartyB(params) {
      this.handleSelect(params, 'partyBName');
    },
    // ----------------------------- 员工 ---------------------------------
    // 清除员工
    handleClearUser(params) {
      this.handleSelectUser({selectList: [], paramsConfig: params});
    },
    // 选择员工
    handleSelectUser(params) {
      this.handleSelect(params, 'userName');
    },
    // 确认选择
    handleSelect(params, displayValue, callback) {
      const arr = params.selectList;
      const item = params.paramsConfig;
      this.setRelationData(item, arr, displayValue, callback);
    },
    // 主表联动赋值
    setRelationData(item, arr, displayValue, callback) {
      this.$set(this.projectForm, item.prop, arr.length > 0 ? arr[0][displayValue] : ''); // 显示值
      this.$set(this.projectForm, item.key, arr.length > 0 ? arr[0].id : ''); // 关键值
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
            this.$set(this.projectForm, row.receive, arr.length > 0 ? address : ''); // 显示值
          } else if (row.areaCode) {
            // 货取地址代码
            const areas = [];
            const keysList = ['province', 'city', 'area'];
            for (const key of keysList) {
              if (arr[0][key] && arr[0][key].indexOf('-')) {
                  const id = arr[0][key].split('-')[1];
                  areas.push(id);
              }
              this.$set(this.projectForm, key, arr[0][key] ? arr[0][key] : ''); // 显示值
            }
            this.$set(this.projectForm, row.receive, arr.length > 0 ? areas : ''); // 显示值
          } else {
            let value = '';
            if (arr.length) {
              value = arr[0][row.value] === undefined ? '' : arr[0][row.value];
            } else {
              value = '';
            }
            this.$set(this.projectForm, row.receive, value); // 显示值
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
    }
  }
};
