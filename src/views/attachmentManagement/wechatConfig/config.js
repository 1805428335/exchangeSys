/*
 * @Author: your name
 * @Date: 2020-11-20 11:45:38
 * @LastEditTime: 2020-11-20 14:59:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\attachmentManagement\wechatConfig\config.js
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
    formList: [],
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
      {show: true, prop: 'index3', label: '二维码'},
      {show: true, prop: 'index5', label: '微信号', filterName: 'setMoney'},
      // 操作
      {show: true, formType: 'operate', label: '操作', minWidth: '100',
      buts: [
          {name: '修改', class: 'warning', fn: 'handleEdit', authCode: 'update'}
      ]}
    ]
  },
  // 手动锁仓
  mainFormConfig: {
    formList: [
        { label: '二维码', prop: 'code1', span: 24, formType: 'upload', limit: 1, isRule: true},
        { label: '微信号', prop: 'code2', span: 24, formType: 'input', isRule: true, maxlength: 64}
    ]
  }
};
class Page {
  constructor() {
    this.PageConfig = JSON.parse(JSON.stringify(PageConfig));
    this.init();
  }
  init () {
    Utils.commonUtil.getSelectList(this.PageConfig.selectList, this);
    Utils.commonUtil.getDicAllDataList(this.PageConfig.dictionary, this);
  }
}
export default Page;
