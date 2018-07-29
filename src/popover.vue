<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
             :class="{[`position-${position}`]:true}">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "g-popover",
        props: {
            position: {
                type: String,
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0;
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            }
        },
        data() {
            return {
                visible: false,
            }
        },
        mounted() {
            if (this.trigger === 'click') {
                this.$refs.popover.addEventListener('click', this.onClick)
                console.log('onclick')
            } else {
                this.$refs.popover.addEventListener('mouseenter', this.open)
                this.$refs.popover.addEventListener('mouseleave', this.close)
            }
        },
        destroyed() {
            if (this.trigger === 'click') {
                this.$refs.popover.removeEventListener('click', this.onClick)
            } else {
                this.$refs.popover.removeEventListener('mouseenter', this.open)
                this.$refs.popover.removeEventListener('mouseleave', this.close)
            }
        },
        methods: {
            positionContent() {
                const {contentWrapper} = this.$refs;
                document.body.appendChild(contentWrapper); //把contentWrapper移到外面去，防止overflow:hidden
                let {top, left, width, height} = this.$refs.triggerWrapper.getBoundingClientRect();
                let {height: height2} = contentWrapper.getBoundingClientRect();
                //表编程驱动
                let positions = {
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollY
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollY
                    },
                    left: {
                        top: top + window.scrollY - (height2 - height) / 2,
                        left: left + window.scrollY,
                    },
                    right: {
                        top: top + window.scrollY - (height2 - height) / 2,
                        left: left + window.scrollY + width
                    }
                };
                contentWrapper.style.left = positions[this.position].left + 'px';
                contentWrapper.style.top = positions[this.position].top + 'px';
                // if (this.position === 'top') {
                //     contentWrapper.style.top = top + window.scrollY + 'px';
                //     contentWrapper.style.left = left + window.scrollY + 'px';
                // } else if (this.position === 'bottom') {
                //     contentWrapper.style.top = top + height + window.scrollY + 'px';
                //     contentWrapper.style.left = left + window.scrollY + 'px';
                // } else if (this.position === 'left') {
                //     contentWrapper.style.left = left + window.scrollY + 'px';
                //     contentWrapper.style.top = top + window.scrollY - (height2 - height) / 2 + 'px';
                // } else if (this.position === 'right') {
                //     contentWrapper.style.top =top + window.scrollY - (height2 - height) / 2 + 'px';
                //     contentWrapper.style.left = left + window.scrollY + width+ 'px';
                // }
            },
            onClickDocument(event) {
                if (this.$refs.popover &&
                    (this.$refs.popover === event.target || this.$refs.popover.contains(event.target))) {
                    return
                } //如果popover存在并且点击对象是popover本身或者popover里面的东西，就return
                if (this.$refs.contentWrapper &&
                    (this.$refs.contentWrapper === event.target || this.$refs.contentWrapper.contains(event.target))) {  //如果点击的不是contentWrapper的话
                    return
                    //如果contentWrapper存在并且点击对象是contentWrapper本身或者contentWrapper里面的东西，就return
                }
                this.close() //前面两个都通过的话，说明你点击的是document，老铁没毛病
            },
            open() {
                this.visible = true;
                this.$nextTick(() => {
                    this.positionContent(); //定位content
                    document.addEventListener('click', this.onClickDocument)// 添加事件监听，目标是点击document的时候让content消失。
                })
            },
            close() {
                this.visible = false;
                document.removeEventListener('click', this.onClickDocument) //取消监听click事件。

            },
            onClick(event) {
                console.log(event.target);
                if (this.$refs.triggerWrapper.contains(event.target)) { //如果点击的是tirggerWrapper，也就是button的话
                    //显示或者消失content
                    if (this.visible === true) {  //如果是显示状态
                        this.close();
                    } else {
                        this.open()
                    }
                }


            }
        },
    }
</script>

<style lang='less' scoped>
    @border-color: #999;
    @border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }

    .content-wrapper {
        border: 1px solid @border-color;
        border-radius: @border-radius;
        /*box-shadow: 0 0 3px rgb(0, 0, 0, 0.5);*/
        filter: drop-shadow(0 1px 1px rgb(0, 0, 0, 0.5));
        background: white;
        position: absolute;
        padding: 0.5em 1em;
        max-width: 20em;
        word-break: break-all;
        &::before, &::after {
            content: '';
            border: 10px solid transparent;
            width: 0;
            height: 0;
            position: absolute;
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                top: 100%;
                border-top-color: @border-color;
            }
            &::after {
                border-top-color: white;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            margin-top: 10px;
            &::before, &::after {
                left: 10px;
            }
            &::before {
                bottom: 100%;
                border-bottom-color: @border-color;
            }
            &::after {
                border-bottom-color: white;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -10px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
            }
            &::before {
                left: 100%;
                border-left-color: @border-color;
            }
            &::after {
                border-left-color: white;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            margin-left: 10px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
            }
            &::before {
                right: 100%;
                border-right-color: @border-color;
            }
            &::after {
                border-right-color: white;
                right: calc(100% - 1px);
            }
        }

    }
</style>