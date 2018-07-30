<template>
    <div class="tabs-item" @click="onClick()" :class="classes">
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
        data() {
            return {
                active: false
            }
        },
        inject: ['eventBus'],
        created() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name;
                //1.在内存中的时候启动监听事件---如果被选择的name===自己的name,那么active=true
            })
        },
        methods: {
            onClick() {
                this.eventBus.$emit('update:selected', this.name)
                //2.点击的时候，触发update事件，提交的 event === this.name
            }
        },
        computed: {
            classes() {
                return {
                    active: this.active //3.通过计算属性改变class
                }
                /*
                     tabs-items的职责就是，监听update事件，并且可以主动触发update事件改变selected，告诉儿子
                */
            }
        }
    }
</script>

<style lang="less" scoped>
    .tabs-item {
        flex-shrink: 0;
        padding: 0 2em;
        &.active {
            background: red;
        }
    }
</style>