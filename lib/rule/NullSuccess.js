/**
 * Created by Alone on 2017/3/22.
 */
'use strict';
const NotNull = require('./NotNull');
module.exports = class NullSuccess extends NotNull {
    get message() {
        return 'empty is success';
    }

    async check(val, field) {
        let valid = await super.check(val, field);
        if (!valid) return true;
        return await this.valid(val, field);
    }

    async valid(val, field) {return true;}
};
module.exports.default = Reflect.construct(module.exports, []);