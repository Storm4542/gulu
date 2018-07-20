<template>
    <div class="row"
        :style="{marginLeft:-gutter/2+'px',marginRight:-gutter/2+'px'}"
    >
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'g-row',
        props:{
            gutter:{
                type:[String,Number]
            }
        },
        mounted(){
            this.$children.forEach((vm)=>{
                vm.gutter = this.gutter
            })
        }
    }
</script>

<style lang="less" scoped>
    .row{display: flex}
</style>