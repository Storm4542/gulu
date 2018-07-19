<template>
    <div class="col" :class="`col-${span}`" ><slot/></div>
</template>

<script>
    export default {
        name: 'g-col',
        props:{
            span:{
                type:[Number,String]
            }
        }
    }
</script>

<style lang="less" scoped>
    .col{
        height: 100px;
        border: 1px solid grey;
        background: green;
        width: 50%;
    }
    .generate-columns(@n, @i: 1) when (@i =< @n) {
        .col-@{i} {
            width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
    }
    .generate-columns(24);
</style>