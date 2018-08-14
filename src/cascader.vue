<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable"></div>
        <div class="popover" v-if="popoverVisable">
            <cascader-item class="cascaderItem" :popoverHeight="popoverHeight" :sourceItem="source"></cascader-item>
        </div>
    </div>
</template>

<script>
    import CascaderItem from './cascader-item'


    export default {
        name: "g-cascader",
        props: {
            source: {
                type: Array
            },
            popoverHeight: {
                type: String
            }
        },
        data() {
            return {
                popoverVisable: true
            }
        },
        components: {
            'cascader-item': CascaderItem
        }
    }
</script>

<style lang='less' scoped>
    @import '_var.less';

    .cascader {
        position: relative;
        > .trigger {
            width: 100px;
            height: 32px;
            border: 1px solid #000;
        }
        > .popover {
            position: absolute;
            top: 100%;
            left: 0;
            background: #fff;
            .box-shadow(0, 0, 5px, #ddd)
        }
    }
</style>