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
    formList: [{show: true, prop: 'index1', label: '用户账号', formType: 'input'}],
    // 是否显示重置按钮
    isReset: false
  },
  // 表格操作按钮
  mainOperateBtn: [
    // {isCustom: false, code: 'sysHandleAdd', authCode: 'create'}
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
      {show: true, prop: 'index1', label: '币种'},
      {show: true, prop: 'index1', label: '余额'},
      {show: true, prop: 'index1', label: '锁定'}
      // 操作
      // {
      //   show: true, formType: 'operate', label: '操作',
      //   buts: [
      //     {name: '启动汇总', class: 'danger', fn: 'handleDelete', authCode: 'delete'},
      //     {name: '关闭汇总', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
      //   ], minWidth: '150px'
      // }
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
