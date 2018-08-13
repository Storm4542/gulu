<template>
    <div class="cascaderItem">
        <div class="left">
            <div class="label" v-for="item in sourceItem" @click="leftSelected = item">
                {{item.name}}

            </div>
        </div>
        <div class="right" v-if="rightItems">
            <cascader-item :sourceItem="rightItems"></cascader-item>
        </div>
    </div>

</template>

<script>
    export default {
        name: "cascader-item",
        props: {
            sourceItem: {
                type: Array
            }
        },
        data() {
            return {
                leftSelected: null
            }
        },
        computed: {
            rightItems() {
                if (this.leftSelected && this.leftSelected.children) {
                    return this.leftSelected.children
                } else {
                    return null
                }
            }
        }

    };
</script>

<style lang='less' scoped>
    .cascaderItem{
        display: flex;
        > .left{
            border: 1px solid blue;
        }
    }
</style>