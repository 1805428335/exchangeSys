/*
 * @Author: your name
 * @Date: 2020-11-20 11:44:05
 * @LastEditTime: 2020-11-30 14:05:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\attachmentManagement\helpCenter\config.js
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
            { show: true, prop: 'index1', label: '名称'},
            // 操作
            {show: true, formType: 'operate', label: '操作', minWidth: '100',
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
        // 子系统表头渲染参数
        tableList: [
            { show: true, prop: 'index1', label: '类型', formType: 'status',
                statusHandle: {
                    '图文': 'is-warning',
                    '文字': 'is-success'
                }
            },
            { show: true, prop: 'index2', label: '内容'},
            { show: true, prop: 'index3', label: '标题'},
            { show: true, prop: 'index4', label: '图片'},
            // 操作
            {show: true, formType: 'operate', label: '操作', minWidth: '100',
            buts: [
                {name: '修改', class: 'warning', fn: 'handleChildrenEdit', authCode: 'updateChildren'},
                {name: '删除', class: 'danger', fn: 'handleChildrenDelete', authCode: 'deleteChildren'}
            ]}
        ]
    }
  });
