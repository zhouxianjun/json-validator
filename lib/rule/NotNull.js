/**
 * Created by Alone on 2017/3/22.
 */
'use strict';
const BasicRule = require('../BasicRule');
module.exports = class NotNull extends BasicRule {
    get message() {
        return 'cannot be empty';
    }

    async check(val, field) {
        return typeof val === 'boolean' || !!val;
    }
};
module.exports.default = Reflect.construct(module.exports, []);