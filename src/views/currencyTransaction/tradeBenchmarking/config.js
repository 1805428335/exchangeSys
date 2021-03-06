/*
 * @Author: your name
 * @Date: 2020-12-03 09:14:28
 * @LastEditTime: 2020-12-03 09:28:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\tradeBenchmarking\config.js
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
            { show: true, prop: 'index1', label: '币种编号'}
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
            { show: true, prop: 'index1', label: '币种编号'
            },
            { show: true, prop: 'index2', label: '状态', formType: 'status',
                statusHandle: {
                    '待分配': 'is-warning',
                    '显示': 'is-success',
                    '不显示': 'is-error',
                    '已分配': 'is-error'
                }
            },
            { show: true, prop: 'index3', label: '是否显示', formType: 'status',
                statusHandle: {
                    '是': 'is-warning',
                    '否': 'is-success'
                }
            }
        ]
    }
});
