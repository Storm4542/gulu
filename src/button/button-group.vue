<template>
    <div class="g-button-group">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "button-group",
        mounted() { //当button-group出现在页面的时候,检测用户是不是写错了
            for (let node of this.$el.children) {
                let name = node.nodeName.toLocaleLowerCase();
                if (name !== 'button') {
                    console.warn(`g-button-group 里面应该都是 button ,但你用的是${name}`)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '_var';
    .g-button-group {
        display: inline-flex;
        vertical-align: middle;
        > .g-button {
            border-radius: 0;
            &:not(:first-child) {
                margin-left: -1px;
            }
            &:first-child {
                border-top-left-radius: @border-radius;
                border-bottom-left-radius: @border-radius;
            }
            &:last-child {
                border-top-right-radius: @border-radius;
                border-bottom-right-radius: @border-radius;
            }
            &:hover {
                z-index: 100;
            }
        }
    }
</style>