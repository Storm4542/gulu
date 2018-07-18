const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Input', () => {
    it('存在.', () => {
        expect(Input).to.be.ok
    });
    describe('props', () => {
        const constructor = Vue.extend(Input);
        let vm;
        afterEach(()=>{
            vm.$destroy()
        });

        it('接受value', () => {
             vm = new constructor({
                propsData: {
                    value: '测试value'
                }
            }).$mount();

            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.value).to.be.eq('测试value');
        });
        it('接受disabled', () => {
             vm = new constructor({
                propsData: {
                    disabled: true
                }
            }).$mount();

            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.disabled).to.be.eq(true);
        });

        it('接受readonly', () => {
             vm = new constructor({
                propsData: {
                    readonly: true
                }
            }).$mount();

            const inputElement = vm.$el.querySelector('input');
            expect(inputElement.readOnly).to.be.eq(true);
        });
        it('接收error.', () => {
             vm = new constructor({
                propsData: {
                    error: 'error'
                }
            }).$mount();
            const useElement = vm.$el.querySelector('use');
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-error');
            const errorMessage = vm.$el.querySelector('.error-message');
            expect(errorMessage.innerText).to.be.eq('error');
        });

    });

    describe('事件', () => {
        const constructor = Vue.extend(Input);
        let vm;
        afterEach(()=>{
            vm.$destroy()
        });
        it('支持change事件', () => {

        })
    })
});
