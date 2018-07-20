<template>
    <div class="col"
         :class="colClass"
         :style="colStyle"
    >
        <slot/>

    </div>
</template>

<script>
    export default {
        name: 'g-col',
        props: {
            span: {
                type: [Number, String]
            },
            offset: {
                type: [Number, String]
            }
        },
        data() {
            return {
                gutter: 0
            }
        },
        computed: {
            colClass() {
                return [
                    this.span && `col-${this.span}`,
                    this.offset && `offset-${this.offset}`
                ]
            },
            colStyle() {
                return {
                    paddingLeft: this.gutter / 2 + 'px',
                    paddingRight: this.gutter / 2 + 'px'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .col {
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