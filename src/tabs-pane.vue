<template>
    <div class="tabs-pane" :class="classes" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-tabs-pane",
        inject: ['eventBus'],
        props: {
            name: {
                type: [String, Number],
                required: true
            }
        },
        data(){
            return{
                active:false
            }
        },
        created() {
            this.eventBus.$on('update:selected', (name) => {
               this.active = name === this.name
                //1.在内存中的时候启动监听事件---如果被选择的name===自己的name,那么active=true
            })
        },
        computed:{
            classes(){
                return {
                    active:this.active
                    //2.通过计算属性改变class
                }
            }
            /*
                和tabs-items相比，tabs-panel只需要监听update事件然后变化就可以了。
            */
        }
    }
</script>

<style lang="less" scoped>
    .tabs-pane {
        &.active{
            background: red;
        }
    }
</style>