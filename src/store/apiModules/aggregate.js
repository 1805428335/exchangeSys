/*
 * @Author: your name
 * @Date: 2020-11-19 12:03:26
 * @LastEditTime: 2020-11-19 16:39:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\store\apiModules\aggregate.js
 */

import transfer from 'store/transfer';

// 公共的接口 语言 数据字典
import publicApiAll from './publicApi';
// 登录
import login from './login/login';
// 首页
import home from './home/home';
// 币币交易
import currencyTransaction from './currencyTransaction/index';

const serveAll = {
  ...publicApiAll,
  login: {
    namespaced: true,
    actions: {
      ...transfer.transToActions(login)
    }
  },
  home: {
    namespaced: true,
    actions: {
      ...transfer.transToActions(home)
    }
  },
  ...currencyTransaction
};

export default {
  ...serveAll
};
