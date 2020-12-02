/*
 * @Author: your name
 * @Date: 2020-06-28 09:08:48
 * @LastEditTime: 2020-10-16 17:09:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \web_basicconfiguration-施工云企业信息及配置\src\filters\index.js
 */
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import Utils from 'util';

// 设置 完整时间
const setTime = (value) => {
    return value ? Utils.commonUtil.formatTime(value) : '';
};
// 设置 日期
const setDate = (value) => {
    return value ? Utils.commonUtil.formatDate(value) : '';
};
// 数据字典过滤
const setDataItem = (value, arr) => {
    return value ? Utils.commonUtil.getDataItemName(value, arr) : '';
};
// 字段定义
const setStatus = (value) => {
    return value === 0 ? '系统字段' : '自定义字段';
};
// 字段定义
const setMoney = (value) => {
    return Utils.commonUtil.toQfw(value);
};
// 设置文件名称
const fileNameFilter = (value) => {
    return value ? (value.substr(0, value.lastIndexOf('_')) ? value.substr(0, value.lastIndexOf('_')) : value) : '';
};
// 设置税率
const setTaxRate = value => {
    return value ? Number(value.taxRate.split('%')[0]) : '';
};

const setTaxRateInfo = value => {
    return value ? `${Number(value)}%` : '';
};

const setTaxWarRate = value => {
    return value ? `${Number(value) * 100}%` : '';
};
// 根据身份证号码判断男女
const sexIdcardFilter = value => {
    return value ? value.substr(16, 1) % 2 === 1 ? '男' : '女' : '';
};

// 身份证号脱敏('331082199708094687' 转换成 '33108219********87') 第8位开始替换8个
const IDcardHide = num => {
    return num.replace(/(\d{8})\d{8}(\d*)/, '$1********$2');
};
// 手机号脱敏('13912345678' 转换成 '139****5678') 第3位开始替换4个
const telHide = num => {
    return num.replace(/(\d{3})\d{4}(\d*)/, '$1****$2');
};
// 账号脱敏 从第一位开始替换一个
const nameHide = num => {
    return num ? num.replace(/(\D{1})\D{1}(\D*)/, '$1*$2') : '';
};

// 设置地址
const setAddress = val => {
    return val ? val.split('-')[1] : '';
};

const systemFilters = (value, row) => {
    // 为数组时
    if (value instanceof Array) {
        const values = [];
        value.forEach(item => {
            values.push(item[row.printValue]);
        });
        return values.join(',');
    }
    // 千分位 且
    if (row.filterName === 'setMoney') {
        if (!value) value = 0;
        return row.precision ? setMoney(Math.round(value * Math.pow(10, row.precision)) / Math.pow(10, row.precision)) : setMoney(value);
    }
    if (row.filterName === 'number') {
        if (!value) value = 0;
        return value ? row.precision ? Math.round(value * Math.pow(10, row.precision)) / Math.pow(10, row.precision) : Math.round(value * Math.pow(10, 4)) / Math.pow(10, 4) : value;
    }
    // 附件
    if (row.filterName === 'attachment') {
        if (!value) return;
        return `附件${value.split(',').length}个`;
    }
    // 日期
    if (row.filterName === 'date' || row.formType === 'date') {
        return setDate(value);
    }
    // 时间
    if (row.filterName === 'time' || row.formType === 'time') {
        return setTime(value);
    }
    // 格式化文件名
    if (row.filterName === 'file') {
        return fileNameFilter(value);
    }
    // 税率
    if (row.filterName === 'taxRate') {
        return setTaxWarRate(value);
    }
    return value;
};

export default {
    setTime,
    setDate,
    setDataItem,
    setTaxRateInfo,
    setTaxWarRate,
    setStatus,
    setMoney,
    fileNameFilter,
    setTaxRate,
    sexIdcardFilter,
    IDcardHide,
    telHide,
    setAddress,
    systemFilters,
    nameHide
};
