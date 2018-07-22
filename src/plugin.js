import Toast from './toast'

export default {
    install(vue, options) {
        vue.prototype.$toast = function (message) {
            let construstor = vue.extend(Toast);
            let toast = new construstor({
                propsData: {
                        closeButton:{
                            text:'知道了',
                            callback:()=>{
                                alert('用户说他知道了')
                            }
                        }
                    }
                });
            toast.$slots.default = [message];//传输默认插槽的内容 <slot/>
            toast.$mount(); //mount一下
            document.body.appendChild(toast.$el) //
        }
    }
}