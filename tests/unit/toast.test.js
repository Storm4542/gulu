const expect = chai.expect;
import Vue from 'vue'
import Toast from '../../src/toast'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast',()=>{
    it('存在',()=>{
        expect(Toast).to.exist
    });
    describe('props',()=>{
        it('接受autoClose',(done)=>{
            let div = document.createElement('div');
            document.body.appendChild(div);
            let constructor = Vue.extend(Toast);
            let vm = new constructor({
                propsData:{
                    autoClose:true,
                    autoCloseDelay:1
                }
            }).$mount(div);
            vm.$on('beforeClose',()=>{
                expect(document.body.contains(vm.$el)).to.eq(false);
                done()
            });
        })

        it('接受closeButton',()=>{
            let callback = sinon.fake();
            let constructor = Vue.extend(Toast);
            let vm = new constructor({
                propsData:{
                    closeButton:{text:'close',callback:callback},
                }
            }).$mount();
            let closeButton = vm.$el.querySelector('.close');
            expect(closeButton.textContent.trim()).to.eq('close');
            closeButton.click();
            expect(callback).to.have.been.called;
        })

        it('接受enableHtml',()=>{
            let constructor = Vue.extend(Toast);
            let vm = new constructor({
                propsData:{
                    enableHtml:true,
                }
            })
            vm.$slots.default = ['<strong id="tests">abc</strong>'];
            vm.$mount();
            let strong = vm.$el.querySelector('#tests');
            expect(strong).to.exist

        })

        it('接收position',()=>{
            let constructor = Vue.extend(Toast);
            let vm = new constructor({
                propsData:{
                    position:'bottom',
                }
            }).$mount();
            expect(vm.$el.classList.contains('position-bottom')).to.eq(true);

        })
    })
});