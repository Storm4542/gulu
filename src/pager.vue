<template>
    <div class="pager">
        <span class="pager-arrow" :class="{disabled:currentPage===1}">
            <g-icon iconname="left"></g-icon>
        </span>
        <template v-for="page in pages">
            <template v-if="page === currentPage">
                <span class="pager-item current"> {{page}}</span>
            </template>
            <template v-else-if="page === '...'">
                <g-icon class="pager-separator" iconname="shenglve">{{page}}</g-icon>
            </template>
            <template v-else>
                <a href="#" class="pager-item other">{{page}}</a>
            </template>
        </template>
        <span class="pager-arrow" :class="{disabled:currentPage===totalPage}">
            <g-icon iconname="right" ></g-icon>
        </span>
    </div>
</template>

<script>
    import GIcon from './icon'

    export default {
        name: "g-pager",
        components: {GIcon},
        props: {
            totalPage: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            hideIfOnePage: {
                type: Boolean,
                default: true
            }
        },
        computed: {},
        data() {
            let pages = [this.totalPage, this.currentPage, this.currentPage - 1, this.currentPage - 2, this.currentPage + 1, this.currentPage + 2, 1];
            let u = unique(pages.sort((a, b) => a - b), this.totalPage);//排序并生成页码
            let u2 = u.reduce((prev, current, index) => {
                if (u[index + 1] !== undefined && u[index + 1] - u[index] > 1) {
                    prev.push(current)
                    prev.push('...')
                } else {
                    prev.push(current)
                }
                return prev
            }, []); //增加省略号
            return {
                pages: u2
            }
        },
        methods: {}
    }

    function unique(array, totalPage) {
        const object = {}
        array.map(e => {
            if (parseInt(e) === 0 || parseInt(e) > totalPage) {
                e = 1
            }
            e = Math.abs(e)
            object[e] = true
        });
        return Object.keys(object).map((s) => parseInt(s, 10));

    }
</script>

<style lang="less" scoped>
    @import "_var";

    @width: 20px;
    @height: 20px;
    @font-size: 12px;
    a {
        text-decoration: none;
        color: inherit;
    }

    .pager {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #eee;
            min-width: @width;
            height: @height;
            border-radius: @border-radius;
            cursor: pointer;
            margin: 0 4px;
        }
        & .disabled {
            svg {
                fill: darken(@grey, 30%)
            }
        }
        &-item {
            border: 1px solid @grey;
            border-radius: @border-radius;
            min-width: @width;
            height: @height;
            padding: 0 4px;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            margin: 0 4px;
            cursor: pointer;

        }
        &-item:hover {
            border-color: blue;
        }
        .current {
            cursor: default;
            border-color: blue;
        }
        &-separator {
            min-width: @width;
            height: @height;
            border: none;
            cursor: default;
        }

    }

</style>