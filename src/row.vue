<template>
    <div class="row"
        :style="rowStyle"
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
        computed:{
          rowStyle(){
              return {
                  marginLeft:-this.gutter/2+'px',
                  marginRight:-this.gutter/2+'px'
              }
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