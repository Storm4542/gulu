import Toast from './toast'
export default {
    install(vue,options){
        vue.prototype.$toast = function (message) {
            let construstor = vue.extend(Toast);
            let toast = new construstor();
            toast.$slots.default = [message];//传输默认插槽的内容
            toast.$mount(); //mount一下
            document.body.appendChild(toast.$el) //
        }
    }
}