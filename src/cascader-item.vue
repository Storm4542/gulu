<template>
    <div class="x">
        {{sourceItem.name}}
        <cascader-item
                v-if="sourceItem.children"
                v-for="item in sourceItem.children"
                :sourceItem="item">
        </cascader-item>
    </div>

</template>

<script>
    export default  {
        name: "cascader-item",
        props:{
            sourceItem:{
                type:Object
            }
        }

    };
</script>

<style lang='less' scoped>
.x{
    border: 1px solid red;
    margin: 10px;
}
</style>