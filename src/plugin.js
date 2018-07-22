import Toast from './toast'

export default {
    install(vue, options) {
        vue.prototype.$toast = function (message,toastOptions) {
            let construstor = vue.extend(Toast);
            let toast = new construstor({
                propsData:toastOptions
                });
            toast.$slots.default = [message];//传输默认插槽的内容 <slot/>
            toast.$mount(); //mount一下
            document.body.appendChild(toast.$el) //
        }
    }
}