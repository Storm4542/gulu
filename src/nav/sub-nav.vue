<template>
    <div class="sub-nav" >
        <span @click="onClick">
            <slot  name="title"></slot>
        </span>
        <div v-show="visible" class="sub-nav-popover">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "g-subNav",
        data(){
            return{
                visible:false
            }
        },
        methods:{
            onClick(){
                this.visible = !this.visible
            }
        }
    }
</script>

<style lang="less" scoped>
    .sub-nav {
        position: relative;
        padding: 10px 20px;
        .sub-nav-popover {
            white-space: nowrap;
            position: absolute;
            top: 100%;
            left: 0;
            border: 1px solid ;
        }
        span{
            display: block;
            cursor: pointer;
        }
    }
    .sub-nav .sub-nav .sub-nav-popover{
        top: 0;
        left: 100%;
        margin-left: 4px;
    }
</style>