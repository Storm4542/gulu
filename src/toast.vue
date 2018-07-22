<template>
    <div class="toast">
        <slot/>
        <div class="line"></div>
        <span class="close" v-if="closeButton" @click="onClickClose()">
            {{closeButton.text}}
        </span>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: {
            autoClose: {
                type: Boolean,
                default: true
            },
            autoCloseDelay: {
                type: [String, Number],
                default: 5
            },
            closeButton: {
                type: [Object],
                default() {
                    return {
                        text: '关闭', callback: () => {
                            this.close()
                        }
                    }
                }
            }
        },
        mounted() {
            if (this.autoClose) {
                setTimeout(() => {
                    this.close()
                }, this.autoCloseDelay * 1000)
            }
        },
        methods: {
            close() {
                this.$el.remove();
                this.$destroy();
            },
            onClickClose() {
                this.close()
                this.closeButton.callback();
            }
        }
    }
</script>

<style lang="less" scoped>
    @font-size: 14px;
    @toast-height: 40px;
    @toast-bg: rgba(0, 0, 0, 0.75);
    @toast-fontcolor: white;
    .toast {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: @toast-height;
        font-size: @font-size;
        color: @toast-fontcolor;
        padding: 0 1em;
        line-height: @toast-height;
        background: @toast-bg;
        display: flex;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    }

    .line {
        border: 1px solid white;
        height: 100%;
        margin-left: 1em;
    }

    .close {
        padding-left: 1em;
    }
</style>