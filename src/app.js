import Vue from 'vue'
import Button from './button'
import icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Content from './content'
import Sider from './sider'
import Header from './header'
import Footer from './footer'

Vue.component('g-button', Button);
Vue.component('g-icon', icon);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-input', Input);
Vue.component('g-row', Row);
Vue.component('g-col', Col);
Vue.component('g-layout', Layout);
Vue.component('g-header', Header);
Vue.component('g-footer', Footer);
Vue.component('g-content', Content);
Vue.component('g-sider', Sider);


new Vue({
    el: '#app',
    data() {
        return {
            loading1: false,
            loading2: true,
            loading3: false,
            success1: true,
            message: 'message'
        }
    },
    methods: {
        inputChange(e) {
            console.log(e);
        },
        clickSuccess(message, event) {
            let btnElement = event.currentTarget;
            let iconElement = event.currentTarget.querySelector('use');
            let iconname = iconElement.getAttribute('xlink:href');
            let svgElement = event.currentTarget.querySelector('svg');
            if (iconname === '#i-success') {
                return '';
            } else {
                this.loading3 = !this.loading3; //用户需要根据自己的loading修改
                setTimeout(() => {
                    iconElement.setAttribute('xlink:href', '#i-success');
                    svgElement.setAttribute('class', 'g-icon  icon');
                }, 1000)

            }

        }
    }

});

//单元测试
// import chai from 'chai'
// import charSpies from 'chai-spies'
//
// const expect = chai.expect;
//
// {
//     const Construstor = Vue.extend(Button);
//     const vm = new Construstor({
//         propsData:{
//             icon : 'setting'
//         }
//     });
//     vm.$mount();
//     let useElement = vm.$el.querySelector('use');
//     let href = useElement.getAttribute('xlink:href');
//     expect(href).to.eq('#i-setting');
//     vm.$el.remove();
//     vm.$destroy();
// }