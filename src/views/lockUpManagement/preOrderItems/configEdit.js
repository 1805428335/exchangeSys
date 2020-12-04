/*
 * @Author: your name
 * @Date: 2020-11-20 10:12:52
 * @LastEditTime: 2020-11-20 10:20:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \exChange\src\views\lockUpManagement\preOrderItems\configEdit.js
 */

import Utils from 'util';

const PageConfig = {
  // 流程
  processParmas: {
    // 删除
    deleteParams: {
        url: 'preOrderItemsEdit/setDelete',
        params: 'id'
    },
    // info
    infoUrl: {
        url: 'preOrderItemsEdit/getInfo',
        params: 'id'
    },
    // save
    saveUrl: {
        url: 'preOrderItemsEdit/setEdit'
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
                label: '项目名称', prop: 'code', span: 8, formType: 'input', isRule: true, maxlength: 64
            },
            {
                label: '投入币种', prop: 'code1', span: 8, formType: 'dicSelect', selectList: [{dataCode: '01', dataName: '人民币'}, {dataCode: '02', dataName: '美元'}], isRule: true
            },
            {
                label: '释放币种', prop: 'code2', span: 8, formType: 'dicSelect', selectList: [{dataCode: '01', dataName: '人民币'}, {dataCode: '02', dataName: '美元'}], isRule: true
            },
            {
                label: '预购比例', prop: 'code3', span: 8, formType: 'input', isRule: true, maxlength: 64
            },
            {
                label: '起投时间', prop: 'code4', span: 8, formType: 'time', isRule: true
            },
            {
                label: '止投时间', prop: 'code5', span: 8, formType: 'time', isRule: true
            },
            {
                label: '总预购量', prop: 'code6', span: 8, formType: 'elNumber', isRule: true, precision: 2, maxlength: 14
            },
            {
                label: '最低预购', prop: 'code7', span: 8, formType: 'elNumber', isRule: true, precision: 2, maxlength: 14
            },
            {
                label: '限投次数', prop: 'code8', span: 8, formType: 'elNumber', isRule: true, precision: 0, maxlength: 12
            },
            {
                label: '总期数', prop: 'code9', span: 8, formType: 'elNumber', isRule: true, precision: 0, maxlength: 12
            },
            {
                label: '释放率', prop: 'code10', span: 8, formType: 'input', isRule: true, maxlength: 64
            },
            {
                label: '秘钥', prop: 'code11', span: 24, formType: 'input', isRule: true, maxlength: 128
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
