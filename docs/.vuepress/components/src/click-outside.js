export default {
    bind: function (el, binding, vnode) {
        document.addEventListener('click', (e) => {
            let {target} = e;
            if (el === target || el.contains(target)) {
                return
            }
            binding.value();
        })
    }
}
// <div class="cascader" ref="cascader" v-click-outside = "close">
