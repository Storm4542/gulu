<template>
    <div class="tabs-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-tabs-item",
        props:{
            disable:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style lang="less" scoped>
.tabs-item{}
</style>