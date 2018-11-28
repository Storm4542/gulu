class Validator {
    constructor() {
    }

    validate(data, rules) {
        let errors = {}
        rules.forEach(rule => {
            let value = data[rule.key];
            if (rule.required) {
                let error = this.required(value);
                if (error) {
                    this.ensureObject(errors, rule.key);
                    errors[rule.key].required = error;
                    return
                }

            }
            //获取rule中所有规则(去除key和required)
            let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required');
            //遍历所有规则，并调用相应方法进行处理
            validators.forEach(validator => {
                //validator is minLength || maxLength || pattern
                if (this[validator]) {
                    let error = this[validator] && this[validator](value, rule[validator]);
                    if (error) {
                        this.ensureObject(errors, rule.key);
                        errors[rule.key][validator] = error
                    }
                } else {
                    throw `不存在的校验器 ${validator}`
                }
            });
        })
        return errors
    }
    static add(name,fn){ //增加全局方法
        Validator.prototype[name] = fn;
    }
    ensureObject(obj, key) {
        if (typeof (obj[key]) !== 'object') {
            obj[key] = {}
        }
    }
    required(value) {
        if (value !== 0 && !value) {
            return '必填'
        }
    };

    pattern(value, pattern) {
        if (pattern === 'email') {
            pattern = /^.+@.+$/
        }
        if (pattern.test(value) === false) {
            return '格式不正确'
        }
    };

    minLength(value, minLength) {
        if (value.length < minLength) {
            return '太短'
        }
    };

    maxLength(value, maxLength) {
        if (value.length > maxLength) {
            return '太长'
        }
    };
}

export default Validator
 function validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
        let value = data[rule.key];
        if (rule.required) {
            let error = validate.required(value);
            if (error) {
                ensureObject(errors, rule.key);
                errors[rule.key].required = error;
                return
            }

        }
        //获取rule中所有规则(去除key和required)
        let validators = Object.keys(rule).filter(key => key !== 'key' && key !== 'required');
        //遍历所有规则，并调用相应方法进行处理
        validators.forEach(validator => {
            //validator is minLength || maxLength || pattern
            if (validate[validator]) {
                let error = validate[validator] && validate[validator](value, rule[validator]);
                if (error) {
                    ensureObject(errors, rule.key);
                    errors[rule.key][validator] = error
                }
            } else {
                throw `不存在的校验器 ${validator}`
            }
        });
        // if (rule.maxLength) {
        //     let error = Validator.maxLength(value, rule.maxLength);
        //     if (error) {
        //         ensureObject(errors, rule.key);
        //         errors[rule.key].maxLength = error
        //     }
        // }

    })
    return errors
}

function ensureObject(obj, key) {
    if (typeof (obj[key]) !== 'object') {
        obj[key] = {}
    }
}

validate.required = (value) => {
    if (value !== 0 && !value) {
        return '必填'
    }
};
validate.pattern = (value, pattern) => {
    if (pattern === 'email') {
        pattern = /^.+@.+$/
    }
    if (pattern.test(value) === false) {
        return '格式不正确'
    }
};
validate.minLength = (value, minLength) => {
    if (value.length < minLength) {
        return '太短'
    }
};
validate.maxLength = (value, maxLength) => {
    if (value.length > maxLength) {
        return '太长'
    }
};