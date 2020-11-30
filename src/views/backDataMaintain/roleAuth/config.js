/*
 * @Author: your name
 * @Date: 2020-11-23 09:44:45
 * @LastEditTime: 2020-11-23 09:52:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\robot\config.js
 */
export default (self) => ({
  // 数据字典
  configMain: {
    //  单选
    isRadio: true,
    // 表格数据
    tableData: [],
    // 表格高度
    maxHeight: 500,
    // 表头操作行配置
    tableHeader: {
      showColumnCtrl: false, // 显示/隐藏列
      refresh: false // 刷新
    },
    // 是否显示分页
    paging: true,
    // 是否默认选中第一行
    defaultSeleFirstLine: true,
    // 合并列
    // 子系统表头渲染参数
    tableList: [
      {show: true, prop: 'index1', label: 'ID'},
      {show: true, prop: 'index2', label: '功能描述'}
    ]
  },
  // 数据项
  configChildren: {
    //  单选
    isRadio: true,
    // 表格数据
    tableData: [],
    // 表格高度
    maxHeight: 500,
    // 表头操作行配置
    tableHeader: {
      showColumnCtrl: false, // 显示/隐藏列
      refresh: false // 刷新
    },
    // 是否显示分页
    paging: false,
    // 是否默认选中第一行
    defaultSeleFirstLine: false,
    // 合并列
    // 子系统表头渲染参数
    tableList: [
      {show: true, prop: 'index1', label: 'ID'},
      {show: true, prop: 'index2', label: '功能描述'}
    ]
  }
});
