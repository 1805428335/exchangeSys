/*
 * @Author: wumaoxia
 * @Date: 2020-11-20 10:04:08
 * @LastEditTime: 2020-11-20 10:13:51
 * @LastEditors: Please set LastEditors
 * @Description: 预购项目
 * @FilePath: \exChange\src\views\lockUpManagement\preOrderItems\config.js
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
      {show: true, prop: 'index1', label: '项目名称'},
      {show: true, prop: 'index2', label: '起投时间', formType: 'time'},
      {show: true, prop: 'index3', label: '止投时间', formType: 'time'},
      {show: true, prop: 'index4', label: '预购比例'},
      {show: true, prop: 'index5', label: '总期数'},
      {show: true, prop: 'index6', label: '总预购量'},
      {show: true, prop: 'index7', label: '完成预购量'},
      {show: true, prop: 'index8', label: '最低预购'},
      {show: true, prop: 'index9', label: '限投次数'},
      {show: true, prop: 'index10', label: '释放率'},
      {show: true, prop: 'index11', label: '投入币种'},
      {show: true, prop: 'index12', label: '解锁币种'},
      // 操作
      {show: true, formType: 'operate', label: '操作', minWidth: '100',
      buts: [
          {name: '修改', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
      ]}
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
