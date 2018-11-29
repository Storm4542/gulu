<template>
    <div class="pager">
        <span class="pager-item" v-for="(page,index) in pages"
              :class="{active:page===currentPage,separator:page==='...'}"
              :key="index">{{page}}</span>

    </div>
</template>

<script>
    export default {
        name: "g-pager",
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

    .pager {
        &-item {
            border: 1px solid @grey;
            border-radius: @border-radius;
            min-width: 20px;
            height: 20px;
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
        .active {
            cursor: default;
            border-color: blue;
        }
        .separator {
            border: none;
            cursor: default;
        }

    }

</style>