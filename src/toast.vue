<template>
    <div class="wrapper" :class="toastClasses">
        <div ref="toast" class="toast" >
            <div class="message">
                <slot v-if="!enableHtml"></slot>
                <div v-if="enableHtml" v-html="$slots.default[0]"></div>
            </div>
            <div class="line" ref="line" v-if="closeButton"></div>
            <span class="close" v-if="closeButton" @click="onClickClose()">
            {{closeButton.text}}
        </span>
        </div>
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
            },
            enableHtml: {
                type: Boolean
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'middle'].indexOf(value) >= 0;
                }
            }

        },
        mounted() {
            this.exeAutoClose();
            this.setLineHeight();
        },
        computed: {
            toastClasses() {
                return {[`position-${this.position}`]: true};
            }
        },
        methods: {
            exeAutoClose() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoCloseDelay * 1000)
                }
            },
            setLineHeight() {
                this.$nextTick(() => {
                    if(this.closeButton){
                        this.$refs.line.style.height =
                            `${this.$refs.toast.getBoundingClientRect().height}px`;
                    }

                })
            },
            close() {
                this.$el.remove();
                this.$emit('beforeClose')
                this.$destroy();
            },
            onClickClose() {
                this.close();
                if (this.closeButton && typeof this.closeButton.callback === 'function') {
                    this.closeButton.callback(this);//this===toast实例
                }
            },
        }
    }
</script>

<style lang="less" scoped>
    @font-size: 14px;
    @toast-minHeight: 40px;
    @toast-bg: rgba(0, 0, 0, 0.75);
    @toast-fontcolor: white;
    @animation-Duration:500ms;

    @keyframes slide-up {
        0% {
            opacity: 0;
            transform: translateY(100%)
        }
        100% {
            opacity: 1;
            transform: translateY(0)
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0;

        }
        100% {
            opacity: 1;
        }
    }
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-100%)
        }
        100% {
            opacity: 1;
            transform: translateY(0)
        }
    }
    .wrapper{
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        &.position-top {
            top: 0;
            .toast{
                border-top-right-radius: 0;
                border-top-left-radius: 0;
                animation: slide-down @animation-Duration;
            }
        }
        &.position-bottom {
            bottom: 0;
            .toast{
                border-bottom-right-radius: 0;
                border-bottom-left-radius: 0;
                animation: slide-up @animation-Duration;
            }
        }
        &.position-middle {
            top: 50%;
            transform: translate(-50%,-50%);
            .toast{
                animation:fade-in @animation-Duration;

            }
        }
    }

    .toast {
        animation: fade-in 1s;
        min-height: @toast-minHeight;
        font-size: @font-size;
        color: @toast-fontcolor;
        line-height: 1.8;
        padding: 0 .5em 0 1.5em;
        background: @toast-bg;
        display: flex;
        align-items: center;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
        &.message {
            padding: 0.5em 0
        }

        .line {
            border: 1px solid white;
            height: 100%;
            margin-left: 1em;
        }
        .close {
            padding-left: 1em;
            flex-shrink: 0;
        }
    }
</style>