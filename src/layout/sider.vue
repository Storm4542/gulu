<template>
    <transition name="fade">
    <div class="sider" v-if="visible">
        <slot/>
        <button @click = 'hideSider()'>close</button>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "g-sider",
        data(){
            return {
                visible:true
            }
        },
        methods:{
            hideSider(){
                return this.visible = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .sider{
        position: relative;
        > button{
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s
    }
    .fade-enter, .fade-leave-active {
        margin-left: -200px;
    }

</style>