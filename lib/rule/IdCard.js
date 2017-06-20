/**
 * Created by Alone on 2017/3/22.
 */
'use strict';
const moment = require('moment');
const NullSuccess = require('./NullSuccess');
const CHINA_ID_MIN_LENGTH = 15;
const CHINA_ID_MAX_LENGTH = 18;
const POWER = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 每位加权因子
const MIN = 1930; // 最低年限
const PROVINCE_CODES = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
};
module.exports = class IdCard extends NullSuccess {
    get message() {
        return 'Must be a 15 or 18 id card';
    }

    async valid(val, field) {
        if (this.for18(val)) {return true};
        if (this.for15(val)) {return true};
        return false;
    }

    for18(val) {
        if (val.length === CHINA_ID_MAX_LENGTH) {
            // 前17位
            let code17 = val.substring(0, 17);
            // 第18位
            let code18 = val.substring(17, CHINA_ID_MAX_LENGTH);
            if (Number.isInteger(Number(code17))) {
                let iSum17 = this.getPowerSum(code17);
                // 获取校验位
                let value = this.getCheckCode18(iSum17);
                if (value.length > 0) {
                    if (value.toUpperCase() === code18.toUpperCase()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    for15(val) {
        if (val.length === CHINA_ID_MIN_LENGTH && Number.isInteger(Number(val))) {
            let proCode = val.substring(0, 2);
            if (!PROVINCE_CODES[proCode]) return false;
            let birthCode = val.substring(6, 12);
            let year = moment(birthCode.substring(0, 2), 'YY').year();
            return !this.validDate(year, parseInt(birthCode.substring(2, 4)), parseInt(birthCode.substring(4, 6)));
        }
        return false;
    }

    getPowerSum(chars) {
        if (POWER.length !== chars.length) return 0;
        let iSum = 0;
        let i = 0;
        for (let char of chars) {
            POWER.forEach((p, index) => {
                if (i === index) {
                    iSum = iSum + parseInt(char) * p;
                }
            });
            i++;
        }
        return iSum;
    }

    getCheckCode18(iSum) {
        switch (iSum % 11) {
            case 10:
                return '2';
            case 9:
                return '3';
            case 8:
                return '4';
            case 7:
                return '5';
            case 6:
                return '6';
            case 5:
                return '7';
            case 4:
                return '8';
            case 3:
                return '9';
            case 2:
                return 'x';
            case 1:
                return '0';
            case 0:
                return '1';
            default:
                return '';
        }
    }

    validDate(iYear, iMonth, iDate) {
        let year = moment().year();
        let datePerMonth;
        if (iYear < MIN || iYear >= year) {
            return false;
        }
        if (iMonth < 1 || iMonth > 12) {
            return false;
        }
        switch (iMonth) {
            case 4:
            case 6:
            case 9:
            case 11:
                datePerMonth = 30;
                break;
            case 2:
                let dm = ((iYear % 4 === 0 && iYear % 100 !== 0) || (iYear % 400 === 0))
                && (iYear > MIN && iYear < year);
                datePerMonth = dm ? 29 : 28;
                break;
            default:
                datePerMonth = 31;
        }
        return (iDate >= 1) && (iDate <= datePerMonth);
    }
};