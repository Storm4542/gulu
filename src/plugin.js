import Toast from './toast'
let currentToast;
export default {
    install(vue) {
        vue.prototype.$toast = function (message, toastOptions) {
            if (currentToast) {
                currentToast.close();
            }
            currentToast = createToast({
                vue,
                message,
                propsData: toastOptions,
                onClose: () => {
                    currentToast = null
                }
            });
        }
    }
}

/*helpers*/
function createToast({vue, message, propsData, onClose}) {
    let construstor = vue.extend(Toast);
    let toast = new construstor({propsData});
    toast.$slots.default = [message];//传输默认插槽的内容 <slot/>
    toast.$mount(); //mount一下
    toast.$on('beforeClose', onClose);
    document.body.appendChild(toast.$el); //
    return toast;
}