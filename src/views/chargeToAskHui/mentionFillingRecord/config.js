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
      {show: true, prop: 'index1', label: '用户', formType: 'select', span: 8},
      {show: true, prop: 'index1', label: '接收地址', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '交易哈希', formType: 'input', span: 8},
      {show: true, prop: 'index1', label: '币种', formType: 'select', span: 8},
      {show: true, prop: 'index1', label: '类型', formType: 'select', span: 8},
      {show: true, prop: 'index1', label: '状态', formType: 'select', span: 8}
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
      {show: true, prop: 'index1', label: '用户'},
      {show: true, prop: 'index2', label: '币种'},
      {show: true, prop: 'index2', label: '操作'},
      {show: true, prop: 'index2', label: '数量'},
      {show: true, prop: 'index2', label: '实际到账'},
      {show: true, prop: 'index2', label: '手续费'},
      {show: true, prop: 'index2', label: '确认数'},
      {show: true, prop: 'index2', label: '状态'},
      {show: true, prop: 'index2', label: '时间'},
      {show: true, prop: 'index2', label: '状态'},
      {show: true, prop: 'index2', label: '提币模式'},
      {show: true, prop: 'index2', label: '交易状态'},
      // 操作
      {
        show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '查看明细', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '充矿工费', class: 'danger', fn: 'handleEdit', authCode: 'delete'},
          {name: '重置UTXO', class: 'danger', fn: 'handleEdit', authCode: 'delete'}
        ], minWidth: '300px'
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
