<template>
    <div class="layout">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style lang="less" scoped>
    .layout{
        display: flex;
        flex-direction: column;
        border: 1px solid red;
    }
</style>