/*
 * @Author: your name
 * @Date: 2020-11-19 19:21:19
 * @LastEditTime: 2020-11-19 19:26:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\transactionRecord\config.js
 */
import Utils from 'util';

const PageConfig = {
  // 流程
  processParmas: {
    // 导出
    exportUrl: {
        url: 'commissionOrder/getExportData'
    }
  },
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
    {isCustom: false, code: 'sysHandleExport', authCode: 'export'}
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
      {show: true, prop: 'index1', label: '成交时间', formType: 'time'},
      {show: true, prop: 'index2', label: '买家ID'},
      {show: true, prop: 'index3', label: '卖家ID'},
      {show: true, prop: 'index4', label: '成交价格', filterName: 'setMoney'},
      {show: true, prop: 'index5', label: '成交数量', filterName: 'setMoney'},
      {show: true, prop: 'index6', label: '对标币'},
      {show: true, prop: 'index7', label: '交易币'},
      {show: true, prop: 'index8', label: '类型'}
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
