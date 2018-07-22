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
import Toast from './toast'
import Plugin from './plugin'

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
Vue.component('g-toast', Toast);

Vue.use(Plugin); //执行install方法

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
    created() {
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

        },
        showToast() {
            this.$toast('弹出toast', {
                closeButton: {
                    text: '知道了',
                    callback: (toast) => {
                        alert('用户说他知道了')
                    }
                },
                enableHtml:false,
                autoCloseDelay:300,
                position:'bottom'
            });
        }
    }

});
