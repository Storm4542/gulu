<template>
    <div class="toast">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props:{

        }
    }
</script>

<style lang="less" scoped>
    @font-size : 14px;
    @toast-height:40px;
    @toast-bg : rgba(0,0,0,0.75);
    @toast-fontcolor:white;
    .toast{
        position: fixed;top: 0;left: 50%;transform: translateX(-50%);
        height: @toast-height;font-size: @font-size;
        color: @toast-fontcolor; padding: 0 1em;
        line-height: @toast-height;background: @toast-bg;
        border-radius: 4px;box-shadow: 0 0 3px 0 rgba(0,0,0,0.50);
    }
</style>