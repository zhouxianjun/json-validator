/**
 * Created by Alone on 2017/3/21.
 */
'use strict';
const util = require('util');
const BasicRule = class BasicRule {
    get message() {return `validate fail`;}

    async check(val, field) {return true;}

    async validate(val, field) {
        let valid = await this.check(val, field);
        if (!valid) {
            field = field.split('/').pop();
            throw new ValidationError(field, val, this);
        }
        return true;
    }
};

const ValidationError = class ValidationError extends Error {
    constructor(field, val, rule, message) {
        super();
        this.field = field;
        this.value = val;
        this.rule = rule;
        this._message = message;
    }

    get message () {
        return `field: ${this.field}, value: ${util.inspect(this.value)}${this.rule && `, rule: ${this.rule.message}`}, message: ${this._message || 'validate fail'}`;
    }
};

module.exports = BasicRule;
module.exports.ValidationError = ValidationError;