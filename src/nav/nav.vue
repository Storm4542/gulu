<template>
    <div class="nav">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-nav",
        props: {
            selected: {
                type: Array,
                default: () => [], //如果默认是空数组，以函数形式返回
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return{
                Children:[],
                namePath:[]
            }
        },
        provide(){
          return{
              root:this
          }
        },
        mounted() {
            this.updateChildren()
            this.Children.forEach((vm) => {
                this.listenToChildren(vm)
            })
        },
        updated() {
            this.updateChildren()
        },
        methods: {
            addChildren(vm){
                this.Children.push(vm);
            },
            updateChildren() {
                this.Children.forEach((vm) => {
                    vm.selected = this.selected.includes(vm.name);
                });
            },
            listenToChildren(vm) {
                vm.$on('add:selected', (name) => {
                    if (this.multiple) {
                        if (!this.selected.includes(name)) {
                            let copy = JSON.parse(JSON.stringify(this.selected));
                            copy.push(name)
                            this.$emit('update:selected', copy)
                        }
                    } else {
                        this.$emit('update:selected', [name])
                    }

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
</style>