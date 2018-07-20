<template>
    <div class="content">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "content"
    }
</script>

<style lang="less" scoped>
    .content{
        flex-grow: 1;
    }

</style>