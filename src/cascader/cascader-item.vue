<template>
    <div class="cascaderItem" :style="{height: height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <icon  class="loading" iconname="loading"></icon>
          </template>
          <template v-else>
            <icon class="iconClass" v-if="rightArrowVisible(item)" iconname="right"></icon>
          </template>
        </span>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items ref="right" :items="rightItems" :height="height"
                                 :loading-item="loadingItem"
                                 :load-data="loadData"
                                 :level="level+1" :selected="selected"
                                 @update:selected="onUpdateSelected">

            </gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: "GuluCascaderItems",
        components: {Icon},
        props: {
            items: {
                type: Array
            },
            height: {
                type: String
            },
            loadingItem: {
                type: Object,
                default: () => ({})
            },
            selected: {
                type: Array,
                default: () => []
            },
            loadData: {
                type: Function
            },
            level: {
                type: Number,
                default: 0
            }
        },
        computed: {
            rightItems() {
                if (this.selected[this.level]) {
                    let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
                    if (selected && selected[0].children && selected[0].children.length > 0) {
                        return selected[0].children
                    }
                }
            },
        },
        mounted() {
        },
        methods: {
            rightArrowVisible(item) {
                return this.loadData ? !item.isLeaf : item.children
            },
            onClickLabel(item) {
                let copy = JSON.parse(JSON.stringify(this.selected));
                copy[this.level] = item
                copy.splice(this.level + 1) // 一句话
                this.$emit('update:selected', copy)
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            }
        }
    }
</script>

<style lang='less' scoped>
    @import "../../styles/_var";

    .cascaderItem {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100px;
        .left {
            height: 100%;
            padding: .3em 0;
            overflow: auto;
        }
        .right {
            height: 100%;
            border-left: 1px solid @border-color-lighten;
        }
        .label {
            padding: 0.2em 1em;
            display: flex;
            align-items: center;
            white-space: nowrap;
            .iconClass {
                transform: scale(.7);
                margin-left: .5em;
                margin-top: .3em;
            }
            .loading{
                animation: spin 2s infinite linear;
            }
        }
    }
</style>