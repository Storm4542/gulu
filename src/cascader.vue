<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable"></div>
        <div class="popover" v-if="popoverVisable">
            <cascader-item class="cascaderItem" :sourceItem="source"></cascader-item>
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
            }
        },
        data(){
            return{
                popoverVisable:false
            }
        },
        components: {
            'cascader-item': CascaderItem
        }
    }
</script>

<style lang='less' scoped>
    .cascader {
        > .trigger{
            width: 100px;
            height: 32px;
            border: 1px solid red;
        }
        > .popover{
            height: 200px;
            border: 1px solid green;
        }
    }
</style>