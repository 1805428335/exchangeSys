
import transfer from 'store/transfer';
// 公共qpi
import publicApi from './publicApi';


const serveAll = {
    publicApi: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(publicApi)
        }
    }
};

export default {
    ...serveAll
};
