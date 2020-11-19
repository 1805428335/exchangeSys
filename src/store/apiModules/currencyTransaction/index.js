/*
 * @Author: your name
 * @Date: 2020-11-19 16:34:06
 * @LastEditTime: 2020-11-19 16:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\store\apiModules\currencyTransaction\index.js
 */

import transfer from 'store/transfer';
import commissionOrder from './commissionOrder';
import currencyIntroduction from './currencyIntroduction';
import robot from './robot';
import tradeBenchmarking from './tradeBenchmarking';
import transactionFee from './transactionFee';
import transactionRecord from './transactionRecord';


const serveAll = {
    commissionOrder: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(commissionOrder)
        }
    },
    currencyIntroduction: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(currencyIntroduction)
        }
    },
    robot: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(robot)
        }
    },
    tradeBenchmarking: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(tradeBenchmarking)
        }
    },
    transactionFee: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(transactionFee)
        }
    },
    transactionRecord: {
        namespaced: true,
        actions: {
            ...transfer.transToActions(transactionRecord)
        }
    }
};

export default {
    ...serveAll
};
