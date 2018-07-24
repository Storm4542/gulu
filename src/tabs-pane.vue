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
            })
        },
        computed:{
            classes(){
                return {
                    active:this.active
                }
            }

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