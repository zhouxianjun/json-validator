/**
 * Created by alone on 17-6-19.
 */
"use strict";
const jpath = require('json-path');
module.exports = {
    rule: {
        Basic: require('./lib/BasicRule'),
        Boolean: require('./lib/rule/Boolean'),
        Digits: require('./lib/rule/Digits'),
        Include: require('./lib/rule/Include'),
        NotNull: require('./lib/rule/NotNull'),
        NullSuccess: require('./lib/rule/NullSuccess'),
        Pattern: require('./lib/rule/Pattern'),
        IdCard: require('./lib/rule/IdCard')
    },
    Regexp: {
        email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        url: /[a-zA-z]+:\/\/[^\s]*/,
        tel: /\d{3}-\d{8}|\d{4}-\{7,8}/,
        qq: /[1-9][0-9]{4,}/,
        zip: /[1-9]\d{5}(?!\d)/
    },
    async valid(data, rules) {
        for (let [fields, rule] of rules) {
            for (let field of fields) {
                let value = jpath.resolve(data, field);
                for (let r of rule) {
                    if (Array.isArray(value)) {
                        if (value.length <= 0) {
                            await r.validate(null, field);
                        }
                        for (let val of value) {
                            await r.validate(val, field);
                        }
                    } else {
                        await r.validate(value, field);
                    }
                }
            }
        }
        return true;
    }
};