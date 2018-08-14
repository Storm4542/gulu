<template>
    <div class="cascaderItem" :style="{height:popoverHeight}">
        <div class="left">
            <div class="label" v-for="item in sourceItem" @click="leftSelected = item">
                {{item.name}}
                <g-icon class="iconClass" iconname="right" v-if="item.children"></g-icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <cascader-item :sourceItem="rightItems" :popoverHeight="popoverHeight"></cascader-item>
        </div>
    </div>

</template>

<script>
    import Icon from './icon'
    export default {
        name: "cascader-item",
        components:{
          'g-icon':Icon
        },
        props: {
            sourceItem: {
                type: Array
            },
            popoverHeight: {
                type: String
            }
        },
        data() {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems() {
                if (this.leftSelected && this.leftSelected.children) {
                    return this.leftSelected.children
                } else {
                    return null
                }
            }
        }

    };
</script>

<style lang='less' scoped>
    @import "_var";
    .cascaderItem {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100px;
        .left {
            height: 100%;
        }
        .right {
            height: 100%;
            border-left: 1px solid @border-color-lighten;
        }
        .label {
            padding: 0.2em 1em;
            display: flex;
            align-items: center;
            .iconClass{
                transform: scale(.7);
                margin-left: .5em;
            }
        }
    }
</style>