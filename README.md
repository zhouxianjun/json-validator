
# 如何安装

[Node.js](http://nodejs.org).

npm install json-validator

---

## 如何使用

```javascript
// 引用模块
const validator = require('json-validator');
// 存放规则
let rule = new Map();
// 设置验证规则
rule.set(['/number', '/visitors[*]/id'], [new validator.rule.Digits()]);
rule.set(['/visitors[*]/card'], [new validator.rule.IdCard()]);

// 采用链式风格
validator.valid({
    number: 1,
    visitors: [{
        id: 1,
        name: 'aaa'
    }, {
        id: '2',
        name: 'bbb'
    }]
}, rule).catch(e => console.error(e.stack));
```

## API

### exports

暴露属性

#### `Object` rule

内置规则

* Basic `BasicRule` - 最基本的验证规则（需要被继承）.
* Boolean `Boolean` - Boolean值验证（这里的Boolean是规则类型的Boolean）.
* Digits `Digits` - 正正数.
    
    **Arguments**
    * min `Number` - 最小
    * max `Number` - 最大
    * include `Array` - 包含
* Include `Include` - 包含(任何类型).

    **Arguments**
    * include `Array` - 包含
* NotNull `NotNull` - 不能为空
* NullSuccess `NullSuccess` - 可以为空（默认）
* Pattern `Pattern` - 正则表达式

    **Arguments**
    * regexp `regexp` - 正则表达式
* IdCard `IdCard` - 身份证验证

#### Regexp

内置正则.

* email - 邮箱
* url - 网址
* tel - 电话
* qq - QQ
* zip - 邮编
