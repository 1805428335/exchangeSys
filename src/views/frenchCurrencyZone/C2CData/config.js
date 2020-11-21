/*
 * @Author: your name
 * @Date: 2020-11-20 09:36:27
 * @LastEditTime: 2020-11-21 11:01:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\frenchCurrencyZone\C2CData\config.js
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
            { show: true, prop: 'index1', label: '用户'},
            { show: true, prop: 'index2', label: '币种'},
            { show: true, prop: 'index3', label: '订单流水'},
            { show: true, prop: 'index4', label: '类型', formType: 'status',
                statusHandle: {
                    '买': 'is-error',
                    '卖': 'is-success'
                }
            },
            { show: true, prop: 'index5', label: '时间'},
            { show: true, prop: 'index6', label: '价格'},
            { show: true, prop: 'index7', label: '数量'},
            { show: true, prop: 'index8', label: '备份数量'},
            { show: true, prop: 'index9', label: '主从单', formType: 'status',
                statusHandle: {
                    '主': 'is-error',
                    '从': 'is-success'
                }
            },
            { show: true, prop: 'index10', label: '状态', formType: 'status',
                statusHandle: {
                    '待付款': 'is-warning',
                    '已完成': 'is-error',
                    '委托中': 'is-success'
                }
            }
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
            { show: true, prop: 'index1', label: '用户'},
            { show: true, prop: 'index2', label: '币种'},
            { show: true, prop: 'index3', label: '订单流水'},
            { show: true, prop: 'index4', label: '类型', formType: 'status',
                statusHandle: {
                    '买': 'is-error',
                    '卖': 'is-success'
                }
            },
            { show: true, prop: 'index5', label: '时间'},
            { show: true, prop: 'index6', label: '价格'},
            { show: true, prop: 'index7', label: '数量'},
            { show: true, prop: 'index8', label: '主从单', formType: 'status',
                statusHandle: {
                    '主': 'is-error',
                    '从': 'is-success'
                }
            },
            { show: true, prop: 'index9', label: '状态', formType: 'status',
                statusHandle: {
                    '待付款': 'is-warning',
                    '已完成': 'is-error',
                    '委托中': 'is-success'
                }
            }
        ]
    }
  });
