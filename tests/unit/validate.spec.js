import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
import Validator from '../../src/validate'

describe('Validator', () => {
    it('存在.', () => {
        expect(Validator).to.exist
    })
    it('required true 报错', () => {
        let data = {
            email: ''
        };
        let rules = [
            {
                key: 'email',
                required: true
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.required).to.eq('必填')
    })
    it('required true 通过', () => {
        let data = {
            email: 0
        };
        let rules = [
            {
                key: 'email',
                required: true
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email).to.not.exist;
    })

    it('pattern 报错', () => {
        let data = {
            email: '1zty.com'

        };
        let rules = [
            {
                key: 'email',
                pattern: /^.+@.+$/
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.pattern).to.eq('格式不正确');
    })
    it('pattern 通过', () => {
        let data = {
            email: '1@zty.com'

        };
        let rules = [
            {
                key: 'email',
                pattern: /^.+@.+$/
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email).to.not.exist;
    })
    it('pattern=email 报错', () => {
        let data = {
            email: '1zty.com'

        };
        let rules = [
            {
                key: 'email',
                pattern: 'email'
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.pattern).to.eq('格式不正确');
    })
    it('pattern=email 通过', () => {
        let data = {
            email: '1@zty.com'

        };
        let rules = [
            {
                key: 'email',
                pattern: 'email'
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email).to.not.exist;
    })
    it('pattern&&required', () => {
        let data = {
            email: ''

        };
        let rules = [
            {
                key: 'email',
                pattern: 'email',
                required: true
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.required).to.exist;
        expect(errors.email.pattern).to.not.exist;
    })
    it('pattern&&minLength', () => {
        let data = {
            email: '12'

        };
        let rules = [
            {
                key: 'email',
                pattern: 'email',
                minLength: 6
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.minLength).to.exist;
        expect(errors.email.pattern).to.exist;
    })
    it('pattern&&maxLength', () => {
        let data = {
            email: '1222222222222222222222222222222222222222.com'

        };
        let rules = [
            {
                key: 'email',
                pattern: 'email',
                maxLength: 10
            }
        ];
        let validator = new Validator()
        let errors = validator.validate(data, rules)
        expect(errors.email.maxLength).to.exist;
        expect(errors.email.pattern).to.exist;
    })
    it('自定义测试规则 hasNumber', () => {
        let data = {
            email: 'adasdsdadas'
        }
        let validator = new Validator()
        validator.hasNumber = (value) => {
            if (!/\d/.test(value)) {
                return '必须含有数字'
            }
        }
        let rules = [
            {key: 'email', required: true, hasNumber: true}
        ]

        let errors
        let fn = () => {
            errors = validator.validate(data, rules)
        }
        expect(fn).to.not.throw();
        expect(errors.email.hasNumber).to.eq('必须含有数字')


    })

    it('添加自有校验方法 两个 validator 互不影响', () => {
        let data = {
            email: 'adasdsdadas'
        }
        let validator1 = new Validator()
        let validator2 = new Validator()
        validator1.hasNumber = (value) => {
            if (!/\d/.test(value)) {
                return '必须含有数字'
            }
        }
        let rules = [
            {key: 'email', required: true, hasNumber: true}
        ]

        let errors
        let fn1 = () => {
            errors = validator1.validate(data, rules) //不throw，因为原型链上有hasNumber
        }
        let fn2 = () => {
            errors = validator2.validate(data, rules) //throw，因为根本没有hasNumber
        }
        expect(fn1).to.not.throw();
        expect(fn2).to.throw();
    })
    it('添加全局校验方法 两个 validator 都不报错', () => {
        let data = {
            email: 'adasdsdadas'
        }
        let validator1 = new Validator()
        let validator2 = new Validator()
        Validator.add('hasNumber', (value) => { //全局添加，增加方法到原型中
            if (!/\d/.test(value)) {
                return '必须含有数字'
            }
        })
        let rules = [
            {key: 'email', required: true, hasNumber: true}
        ]

        let errors
        let fn1 = () => {
            errors = validator1.validate(data, rules) //不throw，因为原型链上有hasNumber
        }
        let fn2 = () => {
            errors = validator2.validate(data, rules) //throw，因为根本没有hasNumber
        }
        expect(fn1).to.not.throw();
        expect(fn2).to.not.throw();



    })
})