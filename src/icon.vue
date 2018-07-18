<template>
    <svg  class="g-icon">
        <use :xlink:href="`#i-${name}`"></use>
    </svg>
</template>

<script>
    import './svg'
    export default {
        name: "g-icon",
        props:['name']
    }
</script>
<style lang="less" scoped>
    .g-icon {
        width: 1em;
        height: 1em;
    }
</style>