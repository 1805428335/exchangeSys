/*
 * @Author: your name
 * @Date: 2020-11-19 16:34:13
 * @LastEditTime: 2020-11-19 16:38:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\store\apiModules\currencyTransaction\currencyIntroduction.js
 */
export default {
    // 查询分页
    getPageList: {
      url: '/quota/requisition/page',
      method: 'post'
    },
    // 查询
    getInfo: {
        url: '/quota/requisition/info',
        method: 'get'
    },
    // 编辑
    setEdit: {
        url: '/quota/requisition/edit',
        method: 'post',
        loading: true
    },
    // 删除
    setDelete: {
        url: '/quota/requisition/delete',
        method: 'get'
    }
};
