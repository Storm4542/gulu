import Vue from 'vue'
import Button from './button'
import icon from './icon'
Vue.component('g-button',Button);
Vue.component('g-icon',icon);
new Vue({
    el:'#app',
    data(){
        return{
            loading1:false,
            loading2:true
        }
    }
})