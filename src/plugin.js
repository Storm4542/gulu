import Toast from './toast'
let currentToast;
export default {
    install(vue) {
        vue.prototype.$toast = function (message, toastOptions) {
            if (currentToast) {
                currentToast.close(); //如果有相同的toast存在于内存中，就销毁上一个，然后再创建新的
            }
            currentToast = createToast({
                vue,
                message, //内容
                propsData: toastOptions, //选项
                onClose: () => { //关闭
                    currentToast = null
                }
            });
        }
    }
}
/*this.$toast('message', {
    closeButton: {
        text: '知道了',
        callback: () => {
            alert('用户说他知道了')
        }
    },
    enableHtml:false,
    autoCloseDelay:3,
    position:'middle'
});*/

/* helpers */
function createToast({vue, message, propsData, onClose}) {
    let construstor = vue.extend(Toast);
    let toast = new construstor({propsData});//创建 toast实例
    toast.$slots.default = [message];//传输默认插槽的内容 <slot/>
    toast.$mount(); //mount一下
    toast.$on('close', onClose); //监听close事件,触发onClose
    document.body.appendChild(toast.$el); //放入页面
    return toast;
}