/*
 * @Author: your name
 * @Date: 2020-11-20 11:41:24
 * @LastEditTime: 2020-11-20 14:10:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\attachmentManagement\discoveryRotation\config.js
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
            {show: true, prop: 'index1', label: '语言', formType: 'status',
                statusHandle: {
                    'English': 'is-success',
                    '中文': 'is-error'
                }
            },
            {show: true, prop: 'index2', label: '类型'},
            {show: true, prop: 'index3', label: '路径'},
            {show: true, prop: 'index4', label: '备注'},
            {show: true, prop: 'index5', label: '是否跳转', formType: 'status',
                statusHandle: {
                    '是': 'is-success',
                    '否': 'is-error'
                }
            },
            {show: true, prop: 'index6', label: '跳转类型', formType: 'status',
                statusHandle: {
                    '外部': 'is-success',
                    '内部': 'is-error'
                }
            },
            {show: true, prop: 'index8', label: '跳转链接'},
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
            { label: '申购用户', prop: 'code1', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '中文', dataCode: '中文'},
                {dataName: '英文', dataCode: '英文'},
                {dataName: '韩文', dataCode: '韩文'}
            ], isRule: true},
            { label: '路径', prop: 'code2', span: 24, formType: 'upload', limit: 1},
            { label: '备注', prop: 'code3', span: 24, formType: 'input', maxlength: 256},
            { label: '是否跳转', prop: 'code4', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '跳转', dataCode: '跳转'},
                {dataName: '不跳转', dataCode: '不跳转'}
                ], isRule: true
            },
            { label: '跳转类型', prop: 'code5', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '内部跳转', dataCode: '内部跳转'},
                {dataName: '外部跳转', dataCode: '外部跳转'}
                ]
            },
            { label: '跳转链接', prop: 'code6', span: 24, formType: 'input', maxlength: 256},
            { label: '类型', prop: 'code7', span: 24, formType: 'dicSelect', selectList: [
                {dataName: '启动动画', dataCode: '启动动画'},
                {dataName: '首页', dataCode: '首页'}
                ], isRule: true
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
