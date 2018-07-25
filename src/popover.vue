<template>
    <div class="popover" @click="visible=!visible">
        <div class="content-wrapper" v-if="visible">
            <slot  name="content" ></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-popover",
        data(){
            return{
                visible:false
            }
        },
        methods:{
        }
    }
</script>

<style lang='less' scoped>
.popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
    .content-wrapper{
        border: 1px solid red;
        box-shadow: 0 0 3px rgb(0,0,0,0.5);
        position: absolute;
        bottom: 100%;
        left: 0;
    }
}
</style>