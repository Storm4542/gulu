<template>
    <div class="nav-item" :class="{selected}" @click="onClick">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-nav-item",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        inject: ['root','vertical'],
        created() {
            this.root.addChildren(this)
        },
        data() {
            return {
                selected: false
            }
        },
        methods: {
            onClick() {
                this.root.namePath = [];
                this.$parent.updateNamePath && this.$parent.updateNamePath()
                this.$emit('add:selected', this.name);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '_var';

    .nav-item {
        padding: 10px 20px;
        cursor: pointer;
        position: relative;
        &.selected {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 1px solid @blue;
                width: 100%;
            }
        }
    }

    .sub-nav .nav-item {
        font-size: @font-size;
        &.selected {
            background: @grey;
            &::after {
                display: none;
            }
        }
    }


</style>