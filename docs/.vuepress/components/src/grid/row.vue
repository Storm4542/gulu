<template>
    <div class="row"
         :style="rowStyle"
         :class="rowClass"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'g-row',
        props: {
            gutter: {
                type: [String, Number]
            },
            align: {
                validator(value) {
                    return ['left', 'right', 'center'].indexOf(value)>=0;
                }
            }
        },
        computed: {
            rowStyle() {
                return {
                    marginLeft: -this.gutter / 2 + 'px',
                    marginRight: -this.gutter / 2 + 'px'
                }
            },
            rowClass() {
                let {align} = this;
                return [`align-${align}`]
            }
        },
        mounted() {
            this.$children.forEach((vm) => {
                vm.gutter = this.gutter
            })
        }
    }
</script>

<style lang="less" scoped>
    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .align {
        &-right {
            justify-content: flex-end;
        }
        &-left {
            justify-content: flex-start;
        }
        &-center {
            justify-content: center;
        }
    }
</style>