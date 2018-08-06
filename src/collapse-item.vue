<template>
    <div class="collapseItem" @click="contentShow">
        <div class="title">
            {{title}}
        </div>
        <div class="content" v-if="isShow">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "g-collapse-item",
        props: {
            title: {
                type: [String, Number],
                required: true
            }
        },
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            contentShow() {
                return this.isShow = !this.isShow;
            }
        }
    }
</script>

<style lang='less' scoped>
    @grey: #ddd;
    .collapseItem {
        .title {
            display: flex;
            /*justify-content: center;*/
            align-items: center;
            border-bottom: 1px solid @grey;
            padding: .5em 1em;
            cursor: pointer;
        }

        .content {
            border-bottom: 1px solid @grey;
            padding: .5em 1em;

        }
        &:last-child{
            .title:last-child{
                border: none;
            }
            .content{
                border: none;
            }
        }
    }
</style>