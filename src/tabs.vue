<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-tabs",
        props:{
            selected:{
                type:[String],
                required:true
            },
            direction:{
                type:[String],
                default:'horizontal',
                validater(value){
                    return ['horizontal','vertical'].indexOf(value)>=0
                }
            }
        }
    }
</script>

<style lang="less" scoped>
.tabs{}
</style>