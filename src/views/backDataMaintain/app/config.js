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
      {show: true, prop: 'index1', label: '语言'},
      {show: true, prop: 'index2', label: '版本'},
      {show: true, prop: 'index3', label: '系统版本'},
      {show: true, prop: 'index4', label: '手机版本'},
      {show: true, prop: 'index5', label: '版本类型'},
      {show: true, prop: 'index6', label: '更新标题'},
      {show: true, prop: 'index7', label: '下载地址'},
      {show: true, prop: 'index8', label: '更新类型'},
      {show: true, prop: 'index9', label: '时间'},
      // 操作
      {show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '修改', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
        ]}
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
      {show: true, prop: 'index1', label: '语言'},
      {show: true, prop: 'index2', label: '版本'},
      {show: true, prop: 'index5', label: '版本类型'},
      {show: true, prop: 'index6', label: '更新标题'},
      {show: true, prop: 'index7', label: '下载地址'},
      {show: true, prop: 'index8', label: '更新类型'},
      {show: true, prop: 'index9', label: '时间'},
      // 操作
      {show: true, formType: 'operate', label: '操作',
        buts: [
          {name: '修改', class: 'warning', fn: 'handleEdit', authCode: 'update'},
          {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
        ]}
    ]
  }
});
