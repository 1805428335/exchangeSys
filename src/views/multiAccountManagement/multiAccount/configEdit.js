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
        label: '类型', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '账户名', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '秘钥', prop: 'code1', span: 24, formType: 'input', isRule: true, maxlength: 64
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

  init() {
    Utils.commonUtil.getSelectList(this.PageConfig.selectList, this);
    Utils.commonUtil.getDicAllDataList(this.PageConfig.dictionary, this);
  }
}

export default Page;
