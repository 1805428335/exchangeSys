/*
 * @Author: your name
 * @Date: 2020-11-19 16:13:36
 * @LastEditTime: 2020-11-20 10:05:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\currencyIntroduction\config.js
 */
import Utils from 'util';

const PageConfig = {
  // 流程
  processParmas: {},
  // 数据字典
  dictionary: [],
  // 接口数据
  selectList: [],
  // 搜索
  searchControls: {
    // 是否显示
    formShow: false,
    // 搜索使用插槽
    searchSlotShow: false,
    // 表单配置
    formList: [{show: true, prop: 'index1', label: '用户', formType: 'select'},
      {
        show: true,
        prop: 'index2',
        label: '币种',
        formType: 'select'
      }],
    // 是否显示重置按钮
    isReset: true
  },
  // 表格操作按钮
  mainOperateBtn: [
    {isCustom: false, code: 'sysHandleAdd', authCode: 'create'}
  ],
  // 主表渲染参数
  mainTable: {
    border: true,
    //  单选
    isRadio: true,
    // 表格数据
    tableData: [],
    // 表格高度
    maxHeight: 500,
    pageSize: 10,
    // 页码
    total: 0,
    // 是否显示分页
    paging: true,
    // 表头操作行配置
    tableHeader: {
      showColumnCtrl: true, // 显示/隐藏列
      refresh: false // 刷新
    },
    // 是否默认选中第一行
    defaultSeleFirstLine: false,
    // 子系统表头渲染参数
    tableList: [
      {show: true, prop: 'index1', label: '图标'},
      {show: true, prop: 'index2', label: '币种id'},
      {show: true, prop: 'index3', label: '币种简称'},
      {show: true, prop: 'index4', label: '币种简称'},
      {show: true, prop: 'index4', label: 'okex行情'},
      {show: true, prop: 'index4', label: '火币行情'},
      {show: true, prop: 'index4', label: '币按行情'},
      {show: true, prop: 'index4', label: '状态'},
      {show: true, prop: 'index4', label: '是否推荐'},
      {show: true, prop: 'index4', label: '价差'},
      {show: true, prop: 'index4', label: '倍数'},
      {show: true, prop: 'index4', label: '最高首数'},
      {show: true, prop: 'index4', label: '手续费'},
      {show: true, prop: 'index4', label: '过夜费'},
      {show: true, prop: 'index4', label: '点差'},
      {show: true, prop: 'index4', label: '精度'},
      // 操作
      {
        show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '行情控制', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '复位', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '编辑', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
        ], minWidth: '240px'
      }
    ]
  }
};

class Page {
  constructor() {
    this.PageConfig = JSON.parse(JSON.stringify(PageConfig));
    this.init();
  }

  init() {
    Utils.commonUtil.getSelectList(this.PageConfig.selectList, this);
    Utils.commonUtil.getDicAllDataList(this.PageConfig.dictionary, this);
  }
}

export default Page;
