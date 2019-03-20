<template>
    <div class="gulu-sticky-wrapper" ref="wrapper">
        <div class="gulu-sticky" :class="classes" :style="{left,width,top}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'g-sticky',
        props: {
            distance: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                sticky: false,
                left: undefined,
                width: undefined,
                top: undefined,
                timerId: null,
            }
        },
        mounted() {
            this.windowScrollHandler = this._windowScrollHandler.bind(this);//在下面调用，this会发生变化，因此提前Bind
            window.addEventListener('scroll', this.windowScrollHandler) //会产生副作用
        },
        beforeDestroy() { //销毁副作用
            window.removeEventListener('scroll', this.windowScrollHandler)
        },
        computed: {
            classes() {
                return {
                    sticky: this.sticky
                }
            }
        },
        methods: {
            offsetTop() { //计算出初始 top
                let {top, height} = this.$refs.wrapper.getBoundingClientRect();
                return {offsetTop: top + window.scrollY, height}
            },
            _windowScrollHandler() {
                let x = () => {
                    let {offsetTop, height} = this.offsetTop();
                    if (window.scrollY >= offsetTop - this.distance) {
                        console.log('滚过去了');
                        let {left, width} = this.$refs.wrapper.getBoundingClientRect();
                        this.$refs.wrapper.style.height = height + 'px';
                        this.width = width + 'px';
                        this.left = left + 'px';
                        this.top = this.distance + 'px';
                        this.sticky = true
                    } else {
                        console.log('没滚过去');
                        this.width = undefined;
                        this.left = undefined;
                        this.top = undefined;
                        this.height = undefined;
                        this.sticky = false
                    }
                };
                if (this.timerId) { //防抖
                    window.clearTimeout(this.timerId)
                }
                this.timerId = setTimeout(x, 200)
            }
        }
    };
</script>

<style lang="less">
    .gulu-sticky {
        border: 1px solid red;
        &.sticky {
            position: fixed;
        }
    }

</style>
