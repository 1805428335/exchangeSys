/*
 * @Author: your name
 * @Date: 2020-11-19 16:44:37
 * @LastEditTime: 2020-11-19 17:25:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\currencyTransaction\currencyIntroduction\configEdit.js
 */

import Utils from 'util';

const PageConfig = {
  // 流程
  processParmas: {
    // 删除
    deleteParams: {
        url: 'currencyIntroduction/setDelete',
        params: 'id'
    },
    // info
    infoUrl: {
        url: 'currencyIntroduction/getInfo',
        params: 'id'
    },
    // save
    saveUrl: {
        url: 'currencyIntroduction/setEdit'
    }
  },
    // 数据字典
    dictionary: [],
    // 接口数据
    selectList: [],
    // 主表
    mainFormConfig: {
        formList: [
            {
                label: '语言', prop: 'code', span: 8, formType: 'dicSelect', selectList: [{dataCode: '01', dataName: '中文'}, {dataCode: '02', dataName: 'English'}], isRule: true
            },
            {
                label: '币种', prop: 'code1', span: 8, formType: 'dicSelect', selectList: [{dataCode: '01', dataName: '人民币'}, {dataCode: '02', dataName: '美元'}], isRule: true
            },
            {
                label: '中文名', prop: 'code2', span: 8, formType: 'input', isRule: true, maxlength: 64
            },
            {
                label: '发行数量', prop: 'code3', span: 8, formType: 'elNumber', isRule: true, precision: 2, maxlength: 14
            },
            {
                label: '发行时间', prop: 'code4', span: 8, formType: 'time', isRule: true
            },
            {
                label: '流通数量', prop: 'code5', span: 8, formType: 'elNumber', isRule: true, precision: 2, maxlength: 14
            },
            {
                label: '众筹价格', prop: 'code6', span: 8, formType: 'elNumber', isRule: true, precision: 2, maxlength: 14
            },
            {
                label: '白皮书', prop: 'code7', span: 8, formType: 'input', isRule: true, maxlength: 128
            },
            {
                label: '官方网站', prop: 'code8', span: 8, formType: 'input', isRule: true, maxlength: 64
            },
            {
                label: '区块查询', prop: 'code9', span: 24, formType: 'input', isRule: true, maxlength: 128
            },
            {
                label: '介绍', prop: 'code10', span: 24, formType: 'textarea', isRule: true, minRows: 2, maxRows: 5, maxlength: 256
            },
            {
                label: '行情', prop: 'code11', span: 24, formType: 'input', isRule: true, maxlength: 256
            }
        ]
    },
    subTableMatch: [],
    // 子表
    subTableConfig: {}
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
