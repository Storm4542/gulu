<template>
    <button class="g-button"
            :class="buttonClass"
            @click="$emit('click',$event)">
        <g-icon class="loading icon" v-if="loading" iconname="loading"></g-icon>
        <g-icon class="icon" v-if='iconname&&!loading' :iconname='iconname'></g-icon>
        <div class="g-content">
            <slot/>
        </div>

    </button>

</template>

<script>
    import Vue from 'vue'
    import Icon from '../icon.vue'
    import svg from '../svg'

    Vue.component('g-icon', Icon);
    export default {
        name: "g-button",
        props: {                   //props的写法,控制性更强
            iconname: {},
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
            },
            success: {
                type: Boolean,
                default: false
            },
            btntype: {
                type: String,
                validate: function (value) {
                    ['primary', 'success', 'warning', 'danger'].map((className) => {
                        if (value === className) {
                            return true
                        }
                        return false
                    })
                }
            }

        },
        computed:{
            buttonClass(){
                let array = [];//初始化class
                if(this.iconPosition){
                    array.push(`icon-${this.iconPosition}`);
                }
                if(this.btntype){
                    array.push(this.btntype)
                }
                return array
            }
        }
    }
</script>

<style lang="less" scoped>
   @import '_var';


    .g-button {
        font-family: @font-family;
        font-size: @font-size; height: @button-height;
        background: @button-bg;
        padding: 0 1.5em; border-radius: @border-radius;
        border: 1px solid @border-color; color: @color;
        display: inline-flex; justify-content: center;
        align-items: center; vertical-align: middle;
        text-align: center;
        &:hover { border-color: @border-hover-bg; }
        &:active { background: @button-active-bg; }
        &:focus { outline: none; }
        > .g-content { order: 2; }
        > .icon { order: 1; margin-right: .5em; margin-left: 0; }
        &.icon-right {
            > .g-content { order: 1; }
            > .icon { order: 2; margin-right: 0; margin-left: .5em; }
        }
        .loading { animation: spin 1s linear infinite; }
    }

    .primary {
        background: @primary-bg-color;
        color: @primary-color;
        font-weight: bold;
        border-color: @primary-border-color;
        > .icon {
            fill: @primary-color;
        }
        &:active {
            background-color: lighten(@primary-bg-color, 20%);
        }
    }

    .success {
        background: @success-bg-color;
        color: @success-color;
        font-weight: bold;
        border-color: @success-border-color;
        > .icon {
            fill: @success-color;
        }
        &:active {
            background-color: lighten(@success-bg-color, 20%);
        }
    }
    .warning {
        background: @warning-bg-color;
        color: @warning-color;
        font-weight: bold;
        border-color: @success-border-color;
        > .icon {
            fill: @warning-color;
        }
        &:active {
            background-color: lighten(@warning-bg-color, 20%);
        }
    }
    .danger {
        background: @danger-bg-color;
        color: @danger-color;
        font-weight: bold;
        border-color: @danger-border-color;
        > .icon {
            fill: @danger-color;
        }
        &:active {
            background-color: lighten(@danger-bg-color, 20%);
        }
    }
</style>