<template>
    <div class="sub-nav" :class="{active}" v-click-out-side="close">
        <span class="label" @click="onClick">
            <slot name="title"></slot>
            <span class="icon" :class="{open}">
                <g-icon iconname="right"></g-icon>
            </span>
        </span>
        <div v-show="open" class="sub-nav-popover" :class="{vertical}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import ClickOutSide from '../click-outside'
    import Icon from '../icon'

    export default {
        name: "g-subNav",
        directives: {ClickOutSide},
        props: {
            name: {
                type: String,
                required: true
            }
        },
        components: {
            'g-icon': Icon
        },
        inject: ['root','vertical'],
        data() {
            return {
                open: false,
            }
        },
        computed: {
            active() {
                return this.root.namePath.indexOf(this.name) >= 0
            }
        },
        methods: {
            onClick() {
                this.open = !this.open
            },
            close() {
                this.open = false
            },
            updateNamePath() {
                this.root.namePath.unshift(this.name);
                if (this.$parent.updateNamePath) {
                    this.$parent.updateNamePath()
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "_var";

    .nav-item {
        padding: 10px 20px;
        cursor: pointer;
        position: relative;
        &.selected {

        }
    }

    .sub-nav {
        position: relative;
        padding: 10px 20px;
        &.active {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 1px solid @blue;
                width: 100%;
            }
        }
        .icon {
            display: none;
        }
        .sub-nav-popover {
            background: #ffffff;
            white-space: nowrap;
            position: absolute;
            top: 100%;
            margin-top: 1px;
            left: 0;
            box-shadow: 0 0 3px @grey;
            border-radius: @border-radius;
            min-width: 8em;

        }
        .vertical{
            position: static;
            border-radius: 0;
            border: none;
            box-shadow: none;
        }
        .label {
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
        }
    }

    .sub-nav .sub-nav {
        .label {
            font-size: @font-size;
        }
    }

    .sub-nav .sub-nav {

        &.active {
            &::after {
                display: none;
            }
        }

        .sub-nav-popover {
            top: 0;
            left: 100%;
            margin-left: 4px;
        }
        .label {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .icon {
            display: inline-flex;
            margin-left: 1em;
            transition: transform 250ms;
        }
        .open {
            transform: rotate(180deg);
        }
    }
</style>