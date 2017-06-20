/**
 * Created by alone on 17-6-19.
 */
const V = require('../index');
let rule = new Map();
rule.set(['/number', '/visitors[*]/id'], [new V.rule.Digits()]);
rule.set(['/visitors[*]/card'], [new V.rule.IdCard()]);
V.valid({
    number: 1,
    visitors: [{
        id: 1,
        name: 'aaa'
    }, {
        id: '2',
        name: 'bbb'
    }]
}, rule).catch(e => console.error(e.stack));