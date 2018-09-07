<template>
    <div class="sub-nav">
        <span>
            <slot name="title"></slot>
        </span>
        <div class="sub-nav-popover">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "g-subNav"
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
    }
</style>