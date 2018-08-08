<template>
    <div class="cascader">
        <div class="trigger">
            <slot></slot>
        </div>
        <div class="popover">
            <div v-for="item in source">
                <cascader-item :sourceItem="item"></cascader-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CascaderItem from './cascader-item'
    export default {
        name: "g-cascader",
        props:{
            source:{
                type:Array
            }
        },
        components:{
            'cascader-item':CascaderItem
        }
    }
</script>

<style lang='less' scoped>
    .cascader {
    }
</style>