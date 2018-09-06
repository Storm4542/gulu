<template>
    <div class="tabs" :class="{[`direction-${directionClass}`]:true}">
        <slot></slot>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: "g-tabs",
        props: {
            selected: {
                type: [String],
                required: true
            },
            direction: {
                type: [String],
                default: 'horizontal',
                validater(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                }
            },
        },
        data() {
            return {
                eventBus: new Vue()  //1.创建一个vue实例
            }
        },
        computed:{
            directionClass(){
                return this.direction
            }
        },
        provide() {
            return {
                eventBus: this.eventBus //2.将vue实例给provide，生成eventBus
            }
        },
        mounted() {
            this.eventBus.$emit('update:selected',this.selected)
            //3.提交一次默认的selected，告诉儿子和孙子
        },

    }
</script>

<style lang="less" scoped>
    .tabs {

    }
    .direction-horizontal{

    }

    .direction-vertical{
        display: flex;
        flex-direction: row;
        & .tabs-head{
            justify-content: flex-start;
            flex-direction: column;
        }
        & .tabs-body{
            border: 1px solid #aaa;
            min-width: 500px;
        }
    }

</style>