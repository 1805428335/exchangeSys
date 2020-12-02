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
        label: '图标', prop: 'code1', span: 24, formType: 'upload', isRule: true, maxlength: 20
      }, {
        label: '币种简称', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '币种全称', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: 'okex链接', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '火币链接', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '币安链接', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '币种', prop: 'code1', span: 8, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '状态', prop: 'code1', span: 8, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '是否推荐', prop: 'code1', span: 8, formType: 'select', isRule: true, maxlength: 20
      }, {
        label: '倍数', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '最高首数', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '建仓费', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '过夜费', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '精度', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '点差', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
      }, {
        label: '秘钥', prop: 'code1', span: 8, formType: 'input', isRule: true, maxlength: 20
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
