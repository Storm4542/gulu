import Vue from "vue";
import Demo from "./demo/demo.vue";
import Button from './button/button'
import ButtonGroup from './button/button-group'
import Cascader from './cascader/cascader'
import Col from './grid/col'
import Collapse from './collapse/collapse'
import CollapseItem from './collapse/collapse-item'
import Content from './layout/content'
import Footer from './layout/footer'
import Header from './layout/header'
import icon from './icon'
import Input from './input'
import Layout from './layout/layout'
import Plugin from './plugin'
import Popover from './popover'
import Row from './grid/row'
import Sider from './layout/sider'
import Tabs from './tabs/tabs'
import TabsBody from './tabs/tabs-body'
import TabsHead from './tabs/tabs-head'
import TabsItem from './tabs/tabs-item'
import TabsPane from './tabs/tabs-pane'
import Toast from './toast'
import Slides from './slides/slides'
import SlidesItem from './slides/slides-item'
import Nav from './nav/nav'
import NavItem from './nav/nav-item'
import SubNav from './nav/sub-nav'

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
Vue.component('g-slides', Slides)
Vue.component('g-slides-item', SlidesItem)
Vue.component('g-nav', Nav);
Vue.component('g-nav-item', NavItem);
Vue.component('g-sub-nav', SubNav);
Vue.use(Plugin); //执行install方法

Vue.config.productionTip = false;

new Vue({
    render: h => h(Demo),

}).$mount("#app");