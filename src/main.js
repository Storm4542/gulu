import Vue from "vue";
import Demo from "./demo.vue";
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

Vue.config.productionTip = false;

new Vue({
    render: h => h(Demo),

}).$mount("#app");
