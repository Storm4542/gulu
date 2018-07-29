<template>
    <div class="popover" @click="xxx()">
        <div ref="contentWrapper" class="content-wrapper" @click.stop v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "g-popover",
        data() {
            return {
                visible: false
            }
        },
        methods: {
            xxx() {
                this.visible = !this.visible;
                if (this.visible === true) {
                    this.$nextTick(() => {
                        document.body.appendChild(this.$refs.contentWrapper);
                        let {top, left} = this.$refs.triggerWrapper.getBoundingClientRect();
                        this.$refs.contentWrapper.style.top = top + window.scrollY + 'px';
                        this.$refs.contentWrapper.style.left = left + window.scrollY + 'px';
                        let eventHandler = () => {
                            this.visible = false;
                            document.removeEventListener('click', eventHandler)
                        };
                        document.addEventListener('click', eventHandler)
                    })
                }
            }
        },
    }
</script>

<style lang='less' scoped>
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }

    .content-wrapper {
        border: 1px solid red;
        box-shadow: 0 0 3px rgb(0, 0, 0, 0.5);
        position: absolute;
        transform: translateY(-100%);
    }
</style>