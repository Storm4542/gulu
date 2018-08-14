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
            onUpdateSelected(newSelected) {//这里能够获取到用户最新点击的数据。
                //定义callback
                console.log(newSelected);
                let lastItem = newSelected[newSelected.length - 1]; //用户最后点的那个选项。
                let callback = (result)=>{

                    let toUpdate = this.source.filter(item=>item.id===lastItem.id)[0];
                    console.log(toUpdate);
                    this.$set(toUpdate,'children',result)

                };
                console.log(lastItem.id)
                //回调：把别人传给我的函数调用一下
                console.log(this.loadData);
                this.loadData(lastItem,callback);
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