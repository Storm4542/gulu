<template>
    <div class="nav" :class="{vertical}">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-nav",
        props: {
            selected: {
                type: String,
            },
            vertical: {  //是否竖着的
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                Children: [],
                namePath: []
            }
        },
        provide() {
            return {
                root: this,
                vertical: this.vertical
            }
        },
        mounted() {
            this.updateChildren()
            this.listenToChildren(this.selected)
        },
        updated() {
            this.updateChildren()
        },
        methods: {
            addChildren(vm) {
                this.Children.push(vm);
            },
            updateChildren() {
                this.Children.forEach((vm) => {
                    vm.selected = this.selected === vm.name;
                });
            },
            listenToChildren(vm) {
                this.Children.forEach((vm) => {
                    vm.$on('update:selected', (name) => {
                        this.$emit('update:selected', name)
                    })
                })

            }
        },
        computed: {
            // Children() {//获取所有 name 为 g-nav-item 的孩子
            //     return this.$children.filter(vm => vm.$options.name === 'g-nav-item')
            // }
        }
    }
</script>

<style lang="less" scoped>
    @import '_var';

    .nav {
        display: flex;
        border-bottom: 1px solid @grey;

    }

    .vertical {
        flex-direction: column;
        border: 1px @grey solid;
    }

</style>