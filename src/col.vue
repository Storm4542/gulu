<template>
    <div class="col"
         :class="[span&&`col-${span}`,offset &&`offset-${offset}`]"
         :style="{paddingLeft: gutter/2+'px', paddingRight:gutter/2+'px'}"
    >
        <div style="border: 1px solid green;height: 100px;"><slot/></div>

    </div>
</template>

<script>
    export default {
        name: 'g-col',
        props:{
            span:{
                type:[Number,String]
            },
            offset:{
                type:[Number,String]
            }
        },
        data(){
            return {
                gutter:0
            }
        }
    }
</script>

<style lang="less" scoped>
    .col{
        height: 100px;
        /*border: 1px solid grey;*/
        width: 50%;
    }
    /*生成col*/
    .generate-columns(@n, @i: 1) when (@i =< @n) {
        .col-@{i} {
            width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
    }
    .generate-columns(24);
    /*生成offset*/
    .generate-offset(@n, @i: 1) when (@i =< @n) {
        .offset-@{i} {
            margin-left: (@i * 100% / @n);
        }
        .generate-offset(@n, (@i + 1));
    }
    .generate-offset(24);

</style>