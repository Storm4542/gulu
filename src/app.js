import Vue from 'vue'
import Button from './button'
import icon from './icon'
import ButtonGroup from './button-group'
Vue.component('g-button',Button);
Vue.component('g-icon',icon);
Vue.component('g-button-group',ButtonGroup);
new Vue({
    el:'#app',
    data(){
        return{
            loading1:false,
            loading2:true
        }
    }
});

//单元测试
import chai from 'chai'
import charSpies from 'chai-spies'

const expect = chai.expect;

{
    const Construstor = Vue.extend(Button);
    const vm = new Construstor({
        propsData:{
            icon : 'setting'
        }
    });
    vm.$mount();
    let useElement = vm.$el.querySelector('use');
    let href = useElement.getAttribute('xlink:href');
    expect(href).to.eq('#i-setting');
    vm.$el.remove();
    vm.$destroy();
}