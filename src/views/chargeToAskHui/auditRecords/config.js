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
    formShow: true,
    // 搜索使用插槽
    searchSlotShow: false,
    // 表单配置
    formList: [
      {show: true, prop: 'index1', label: '日期类型', formType: 'select', span: 8},
      {show: true, prop: 'index1', label: '起始时间', formType: 'date', span: 8},
      {show: true, prop: 'index1', label: '截止时间', formType: 'date', span: 8},
      {show: true, prop: 'index1', label: '用户编号', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '开户名', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '开户银行', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '银行卡号', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '开户地址', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '手机号码', formType: 'input', span: 8}
    ],
    // 是否显示重置按钮
    isReset: true
  },
  // 表格操作按钮
  mainOperateBtn: [
    {isCustom: false, code: 'sysHandleAdd', authCode: 'create', name: '在线查交易'}
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
      {show: true, prop: 'index1', label: 'Excel序号'},
      {show: true, prop: 'index2', label: 'Excel工作名称'},
      {show: true, prop: 'index2', label: '开户名'},
      {show: true, prop: 'index2', label: '导入时间'},
      {show: true, prop: 'index2', label: '直推人'},
      {show: true, prop: 'index2', label: '开户银行'},
      {show: true, prop: 'index2', label: '银行卡号'},
      {show: true, prop: 'index2', label: '开户地址'},
      {show: true, prop: 'index2', label: '手机号'},
      {show: true, prop: 'index2', label: '实发金额'},
      {show: true, prop: 'index2', label: '备注'},
      {show: true, prop: 'index2', label: '是否转账'},
      {show: true, prop: 'index2', label: '状态'},
      {show: true, prop: 'index2', label: '处理时间'},
      {show: true, prop: 'index2', label: '打款凭证'},
      // 操作
      {
        show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '查看明细', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '查看付款凭证', class: 'danger', fn: 'handleEdit', authCode: 'delete'}
        ], minWidth: '240px'
      }
    ]
  },
  mainFormConfig: {
    formList: [
      {
        label: '图标',
        prop: 'code1',
        span: 24,
        formType: 'upload',
        isRule: true,
        maxlength: 20
      }, {
        label: '类型', prop: 'code1', span: 12, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '名称', prop: 'code1', span: 12, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '简称', prop: 'code1', span: 12, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '颜色', prop: 'code1', span: 12, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '冷钱包地址', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64
      }, {
        label: '热钱包地址', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64
      }, {
        label: 'bip类型', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64
      }, {
        label: '秘钥', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64
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
