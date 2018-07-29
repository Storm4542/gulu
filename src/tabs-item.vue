<template>
    <div class="tabs-item" @click="xxx()" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-tabs-item",
        props: {
            disable: {
                type: Boolean,
                default: false
            },
            name: {
                type: [Number, String],
                required: true
            }
        },
        data(){
          return{
              active:false
          }
        },
        inject: ['eventBus'],
        created() {
            this.eventBus.$on('update:selected', (name) => {
               this.active = name === this.name;
            })
        },
        methods:{
            onClick(){
                this.eventBus.$emit('update:selected',this.name)
            }
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
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
        &.active{
            background: red;
        }
    }
</style>