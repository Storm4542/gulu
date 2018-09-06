<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="actions-wrapper">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "g-tabs-head",
        props: {},
        created() {

        }
    }
</script>

<style lang="less" scoped>
    @tab-height: 40px;
    .tabs-head {
        display: flex;
        min-height: @tab-height;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid grey;
        >.actions-wrapper{
            margin-left: auto
        }
    }
</style>