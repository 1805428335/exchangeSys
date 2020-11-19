
import transfer from 'store/transfer';

// 公共的接口 语言 数据字典
import publicApiAll from './publicApi';
// 登录
import login from './login/login';
// 首页
import home from './home/home';

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
  }
};

export default {
  ...serveAll
};
