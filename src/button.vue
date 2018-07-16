<template>

    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}">
        <g-icon class="icon" v-if = 'icon' :name = 'icon'></g-icon>
        <div class="content">
            <slot></slot>
        </div>

    </button>

</template>

<script>

    export default {
        name: "button",
        props: {                   //props的写法,控制性更强
            icon: {},
            iconPosition: {
                type: String,
                default: 'left',
                validate: function (value) {  //属性检查器
                    return !(value !== 'left' && value !== 'right');
                }
            }
        }
    }
</script>

<style lang="less">
    .g-button {
        font-size: var(--font-size);
        height: var(--button-height);
        background: var(--button-bg);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        color: var(--color);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover {
            border-color: var(--border-hover-bg);
        }

        &:active {
            background: var(--button-active-bg);
        }
        &:focus {
            outline: none;
        }

        > .content {
            order: 2;
        }
        > .icon {
            order: 1;
            margin-right: .1em;
            margin-left: 0;
        }

        &.icon-right {
            > .content {
                order: 1;
            }
            > .icon {
                order: 2;
                margin-right: 0;
                margin-left: .1em;
            }
        }

    }


</style>