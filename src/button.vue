<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}"
            @click="$emit('click')">
        <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
        <g-icon class="icon" v-if='icon&&!loading' :name='icon'></g-icon>
        <div class="content">
            <slot/>
        </div>

    </button>

</template>

<script>
    import Vue from 'vue'
    import Icon from './icon'
    Vue.component('g-icon',Icon);
    export default {
        name: "button",
        props: {                   //props的写法,控制性更强
            icon: {},
            loading: {
                type: Boolean,
                default: false,
            },
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
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

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
        .loading {
            animation: spin 1s linear infinite;
        }

    }


</style>