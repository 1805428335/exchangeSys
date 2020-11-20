/*
 * @Author: your name
 * @Date: 2020-11-20 11:44:54
 * @LastEditTime: 2020-11-20 15:33:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\attachmentManagement\transactionType\config.js
 */
import Utils from 'util';

const PageConfig = {
    // 流程
    processParmas: {
        saveUrl: {
            url: 'discoveryRotation/setEdit'
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
        {isCustom: false, code: 'sysHandleAdd', authCode: 'create'}
    ],
    // 主表渲染参数
    mainTable: {
        treeProps: {children: 'children', hasChildren: 'hasChildren'},
        defaultExpandAll: true,
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
            {show: true, prop: 'index1', label: '中文名称'},
            {show: true, prop: 'index2', label: '英文名称'},
            {show: true, prop: 'index3', label: '韩文名称'},
            {show: true, prop: 'index4', label: '图标'},
            {show: true, prop: 'index5', label: '状态', formType: 'status',
                statusHandle: {
                    '收入': 'is-success',
                    '支出': 'is-error'
                }
            },
            {show: true, prop: 'index6', label: '类型'},
            // 操作
            {show: true, formType: 'operate', label: '操作', minWidth: '100',
                buts: [
                    {name: '修改', class: 'warning', fn: 'handleEdit', authCode: 'update'},
                    {name: '删除', class: 'danger', fn: 'handleDelete', authCode: 'delete'}
                ]
            }
        ]
    },
    // 手动锁仓
    mainFormConfig: {
        formList: [
            { label: '中文名称', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64},
            { label: '英文名称', prop: 'code2', span: 24, formType: 'input', isRule: true, maxlength: 64},
            { label: '韩文名称', prop: 'code3', span: 24, formType: 'input', isRule: true, maxlength: 64},
            { label: '图标', prop: 'code4', span: 24, formType: 'upload', limit: 1, isRule: true},
            { label: '账户类型', prop: 'code5', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '币币账户', dataCode: '币币账户'},
                {dataName: '法币账户', dataCode: '法币账户'},
                {dataName: 'CID账户', dataCode: 'CID账户'}
                ], isRule: true
            },
            { label: '状态', prop: 'code6', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '收入', dataCode: '收入'},
                {dataName: '支出', dataCode: '支出'}
                ], isRule: true
            },
            { label: '类型', prop: 'code7', span: 24, formType: 'input', isRule: true, maxlength: 256}
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
