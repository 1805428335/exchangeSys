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
      {show: true, prop: 'index1', label: '用户账号'},
      {show: true, prop: 'index2', label: '谷歌验证'},
      {show: true, prop: 'index3', label: '姓名'},
      {show: true, prop: 'index4', label: '身份证号'},
      {show: true, prop: 'index5', label: '地区'},
      {show: true, prop: 'index6', label: '正面'},
      {show: true, prop: 'index7', label: '手持'},
      {show: true, prop: 'index7', label: '反面'},
      // 操作
      {
        show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '解绑', class: 'danger', fn: 'handleEdit', authCode: 'delete'},
          {name: '查看实名信息', class: 'danger', fn: 'handleEdit', authCode: 'delete'}
        ], minWidth: '150px'
      }
    ]
  },
  mainFormConfig: {
    formList: [
      {
        label: '手续费',
        prop: 'code1',
        span: 24,
        formType: 'input',
        isRule: true,
        maxlength: 20
      }, {
        label: '是否开放', prop: 'code1', span: 24, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '支付提醒时长(秒)', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 20
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
