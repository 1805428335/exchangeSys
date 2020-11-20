/*
 * @Author: your name
 * @Date: 2020-11-20 10:06:32
 * @LastEditTime: 2020-11-20 13:48:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\lockUpManagement\lockUpRecord\config.js
 */
import Utils from 'util';

const PageConfig = {
    // 流程
    processParmas: {
        saveUrl: {
            url: 'lockUpRecord/setEdit'
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
        {isCustom: true, name: '收益明细', icon: 'el-icon-document', code: 'handleIncomeDetails', authCode: 'incomeDetails'},
        {isCustom: true, name: '插入订单', icon: 'el-icon-document-add', class: 'other', code: 'handleInsertOrder', authCode: 'insertOrder'}
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
            {show: true, prop: 'index1', label: '订单号'},
            {show: true, prop: 'index2', label: '预购数量'},
            {show: true, prop: 'index3', label: '用户'},
            {show: true, prop: 'index4', label: '状态', formType: 'status',
                statusHandle: {
                    '收益中': 'is-success'
                }
            },
            {show: true, prop: 'index5', label: '预购时间', formType: 'time'},
            {show: true, prop: 'index6', label: '下次释放时间', formType: 'time'},
            {show: true, prop: 'index7', label: '是否释放', formType: 'status',
                statusHandle: {
                    '是': 'is-success',
                    '否': 'is-error'
                }
            },
            {show: true, prop: 'index8', label: '总期数'},
            {show: true, prop: 'index9', label: '释放期数'},
            {show: true, prop: 'index10', label: '释放率'}
        ]
    },
    // 手动锁仓
    mainFormConfig: {
        formList: [
            { label: '申购用户', prop: 'code1', span: 24, formType: 'select', selectList: [], isRule: true},
            { label: '申购项目', prop: 'code2', span: 24, formType: 'select', selectList: [], isRule: true},
            { label: '申购数量(/BRT)', prop: 'code3', span: 24, formType: 'elNumber', precision: 0, isRule: true, maxlength: 12},
            { label: '秘钥', prop: 'code4', span: 24, formType: 'input', isRule: true, maxlength: 256}
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
