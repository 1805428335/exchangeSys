/*
 * @Author: your name
 * @Date: 2020-11-19 19:12:33
 * @LastEditTime: 2020-11-20 10:13:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\commissionOrder\config.js
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
  mainOperateBtn: [],
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
      {show: true, prop: 'index1', label: '类型'},
      {show: true, prop: 'index2', label: '委托用户'},
      {show: true, prop: 'index3', label: '委托总量', filterName: 'setMoney'},
      {show: true, prop: 'index4', label: '未成交量', filterName: 'setMoney'},
      {show: true, prop: 'index5', label: '委托价格', filterName: 'setMoney'},
      {show: true, prop: 'index6', label: '下单时间', formType: 'time'},
      {show: true, prop: 'index7', label: '对标币'},
      {show: true, prop: 'index8', label: '交易币'},
      // 操作
      {show: true, formType: 'operate', label: '操作', minWidth: 100,
      buts: [
          {name: '撤销订单', class: 'danger', fn: 'handleCancellationOrder', authCode: 'cancellationOrder'}
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
