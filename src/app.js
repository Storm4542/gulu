import Button from './button'
import ButtonGroup from './button-group'
import Cascader from './cascader'
import Col from './col'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Content from './content'
import Footer from './footer'
import Header from './header'
import icon from './icon'
import Input from './input'
import Layout from './layout'
import Plugin from './plugin'
import Popover from './popover'
import Row from './row'
import Sider from './sider'
import Tabs from './tabs'
import TabsBody from './tabs-body'
import TabsHead from './tabs-head'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import Toast from './toast'
import Vue from 'vue'

Vue.component('g-button', Button);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-cascader', Cascader);
Vue.component('g-col', Col);
Vue.component('g-collapse', Collapse);
Vue.component('g-collapse-item', CollapseItem);
Vue.component('g-content', Content);
Vue.component('g-footer', Footer);
Vue.component('g-header', Header);
Vue.component('g-icon', icon);
Vue.component('g-input', Input);
Vue.component('g-layout', Layout);
Vue.component('g-popover', Popover);
Vue.component('g-row', Row);
Vue.component('g-sider', Sider);
Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-body', TabsBody);
Vue.component('g-tabs-head', TabsHead);
Vue.component('g-tabs-item', TabsItem);
Vue.component('g-tabs-pane', TabsPane);
Vue.component('g-toast', Toast);

Vue.use(Plugin); //执行install方法

new Vue({
    el: '#app',
    data() {
        return {
            source: [
                {
                    name: '山东', children: [{name: '济南', children: [{name: '市中区'}]}],

                },
                {
                    name:'河北',
                    children:[
                        {
                            name:'石家庄',
                            children:[
                                {
                                    name:'XX区'
                                },
                                {
                                    name:'YY区'
                                }
                            ]
                        },
                        {
                            name:'邢台',
                            children:[
                                {
                                    name:'ZZ区'
                                },
                                {
                                    name:'KK区'
                                }
                            ]
                        }
                    ]
                }

            ],

            loading1: false,
            loading2: true,
            loading3: false,
            success1: true,
            message: 'message',
            selectedTab: 'sports',
            selected1: ["2", "3"],
            selected2: ["2"],
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

        },
        showToast1() {
            this.$toast('弹出toast', {
                closeButton: {
                    text: '知道了',
                    callback: () => {
                        alert('用户说他知道了')
                    }
                },
                enableHtml: false,
                autoCloseDelay: 3,
                position: 'top'
            });
        },
        showToast2() {
            this.$toast('弹出toast', {
                closeButton: {
                    text: '知道了',
                    callback: () => {
                        alert('用户说他知道了')
                    }
                },
                enableHtml: false,
                autoCloseDelay: 3,
                position: 'middle'
            });
        },
        showToast3() {
            this.$toast('弹出toast', {
                closeButton: {
                    text: '知道了',
                    callback: () => {
                        alert('用户说他知道了')
                    }
                },
                enableHtml: false,
                autoCloseDelay: 3,
                position: 'bottom'
            });
        }
    }

});
