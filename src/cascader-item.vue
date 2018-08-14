<template>
    <div class="cascaderItem" :style="{height:popoverHeight}">
        selected:{{selected&&selected[this.level]&&selected[this.level].name}}
        level:{{level}}
        <div class="left">
            <div class="label" v-for="item in sourceItem" @click="onClickLabel(item)">
                {{item.name}}
                <g-icon class="iconClass" iconname="right" v-if="item.children"></g-icon>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <cascader-item :sourceItem="rightItems"
                           :selected="selected"
                           :level="level+1"
                           @update:selected="onUpdateSelected"
                           :popoverHeight="popoverHeight">

            </cascader-item>
        </div>
    </div>

</template>

<script>
    import Icon from './icon'

    export default {
        name: "cascader-item",
        components: {
            'g-icon': Icon
        },
        props: {
            sourceItem: {
                type: Array
            },
            popoverHeight: {
                type: String
            },
            selected: {
                type: Array,
                default: () => []
            },
            level: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
            }
        },
        computed: {
            rightItems() {
                let currentSelected = this.selected[this.level];
                if (currentSelected && currentSelected.children) {
                    return currentSelected.children
                } else {
                    return null
                }
            },
        },
        methods: {
            onClickLabel(item) {
                let copySelected = JSON.parse(JSON.stringify(this.selected));
                copySelected[this.level] = item;
                this.$emit('update:selected', copySelected);
            },
            onUpdateSelected(newSelected){
                this.$emit('update:selected', newSelected);
            }

        }

    };
</script>

<style lang='less' scoped>
    @import "_var";

    .cascaderItem {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 100px;
        .left {
            height: 100%;
        }
        .right {
            height: 100%;
            border-left: 1px solid @border-color-lighten;
        }
        .label {
            padding: 0.2em 1em;
            display: flex;
            align-items: center;
            .iconClass {
                transform: scale(.7);
                margin-left: .5em;
            }
        }
    }
</style>