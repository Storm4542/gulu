<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisable = !popoverVisable">
            <g-input :readonly=true :value="result"></g-input>
        </div>
        <div class="popover" v-if="popoverVisable">
            <cascader-item class="cascaderItem"
                           :selected="selected"
                           :popoverHeight="popoverHeight"
                           :sourceItem="source"
                           @update:selected="onUpdateSelected">

            </cascader-item>
        </div>
    </div>
</template>

<script>
    import CascaderItem from './cascader-item'
    import Input from './input'

    export default {
        name: "g-cascader",
        props: {
            source: {
                type: Array
            },
            popoverHeight: {
                type: String
            },
            selected: {
                type: Array,
                default: () => []
            },
            loadData:{
                type:Function
            }
        },
        data() {
            return {
                popoverVisable: false
            }
        },
        methods: {
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected);
            }
        },
        computed:{
          result(){
                return this.selected.map((item)=>item.name).join('/')
          }
        },
        components: {
            'cascader-item': CascaderItem,
            'g-input':Input
        }
    }
</script>

<style lang='less' scoped>
    @import '_var.less';

    .cascader {
        position: relative;
        > .trigger {

        }
        > .popover {
            position: absolute;
            overflow: auto;
            top: 100%;
            left: 0;
            background: #fff;
            .box-shadow(0, 0, 5px, #ddd)
        }
    }
</style>