/*
 * @Author: your name
 * @Date: 2020-11-20 09:36:23
 * @LastEditTime: 2020-11-20 09:59:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\frenchCurrencyZone\complaintRecord\config.js
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
      {show: true, prop: 'index1', label: '申诉人'},
      {show: true, prop: 'index2', label: '买家昵称'},
      {show: true, prop: 'index3', label: '买家手机号'},
      {show: true, prop: 'index4', label: '卖家昵称'},
      {show: true, prop: 'index5', label: '买家手机号'},
      {show: true, prop: 'index6', label: '订单号'},
      {show: true, prop: 'index7', label: '申诉描述'},
      {show: true, prop: 'index8', label: '申诉图片'},
      {show: true, prop: 'index9', label: '申诉时间', formType: 'time'},
      {show: true, prop: 'index10', label: '状态', formType: 'status',
        statusHandle: {
            '交易暂停': 'is-warning',
            '交易失败': 'is-error',
            '交易成功': 'is-success'
        }
      },
      {show: true, prop: 'index11', label: '处理结果', formType: 'status',
        statusHandle: {
            '强制买家释放': 'is-error',
            '强制卖家放行': 'is-success'
        }
      }
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
