<template>
    <div class="nav-item" :class="{selected}" @click="onClick">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-nav-item",
        props: {
            name: {
                type: String,
                required: true
            }
        },
        inject:['root'],
        created(){
           this.root.addChildren(this)
        },
        data() {
            return {
                selected: false
            }
        },
        methods: {
            onClick() {
                this.$emit('add:selected', this.name)
            }
        }
    }
</script>

<style lang="less" scoped>
    .nav-item {
        padding: 10px 20px;
    }

    .selected {
        color: red;
    }
</style>