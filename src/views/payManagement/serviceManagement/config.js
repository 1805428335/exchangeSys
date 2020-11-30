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
    formList: [{show: true, prop: 'index1', label: '用户', formType: 'input'}],
    // 是否显示重置按钮
    isReset: false
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
      {show: true, prop: 'index1', label: '客服账号'},
      {show: true, prop: 'index2', label: '用户名'},
      {show: true, prop: 'index3', label: '今日处理订单'},
      {show: true, prop: 'index4', label: '今日处理金额'},
      {show: true, prop: 'index5', label: '历史处理订单'},
      {show: true, prop: 'index6', label: '历史处理金额'},
      {show: true, prop: 'index7', label: '待处理订单'},
      {show: true, prop: 'index8', label: '支付方式'},
      // 操作
      {
        show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '编辑', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
        ], minWidth: '120px'
      }
    ]
  },
  mainFormConfig: {
    formList: [
      {
        label: '客服账号',
        prop: 'code1',
        span: 24,
        formType: 'input',
        isRule: true,
        maxlength: 20
      }, {
        label: '密码', prop: 'code1', span: 24, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '客服名', prop: 'code2', span: 24, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '支付方式', prop: 'code3', span: 24, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '秘钥', prop: 'code4', span: 24, formType: 'input', isRule: true, maxlength: 64
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
