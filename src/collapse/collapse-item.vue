<template>
    <div class="collapseItem" @click="toggle">
        <div class="title">
            {{title}}
        </div>
        <div class="content" v-if="isShow">
            <slot></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "g-collapse-item",
        props: {
            title: {
                type: [String, Number],
                required: true
            },
            name: {
                type: [String],
                required: true
            }
        },
        data() {
            return {
                isShow: false,
                single: false
            }
        },
        methods: {
            toggle() {
                if (this.isShow) {
                    this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
                } else {
                    this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
                }
            },

        },
        inject: ['eventBus'],
        mounted: function () {
            this.eventBus && this.eventBus.$on('update:selected', (names) => {
                if (names.indexOf(this.name) >= 0) {
                    this.isShow = true;
                } else {
                    this.isShow = false

                }
            })

        }
    }
</script>

<style lang='less' scoped>
@import '_var';
    .collapseItem {
        .title {
            display: flex;
            /*justify-content: center;*/
            align-items: center;
            border-bottom: 1px solid @grey;
            padding: .5em 1em;
            cursor: pointer;
        }

        .content {
            border-bottom: 1px solid @grey;
            padding: .5em 1em;
        }
        &:last-child {
            .title:last-child {
                border: none;
            }
            .content {
                border: none;
            }
        }
    }
</style>