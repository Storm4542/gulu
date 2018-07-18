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
    import Icon from './icon.vue'
    import svg from './svg'
    Vue.component('g-icon',Icon);
    export default {
        name: "g-button",
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

<style lang="less" scoped>
        @button-height: 32px;
        @font-size: 14px;
        @button-bg: white;
        @button-active-bg: #eee;
        @border-radius: 4px;
        @color: #333;
        @border-color: #999;
        @border-hover-bg: #666;

    @keyframes spin { 0% {  transform: rotate(0deg);  }
        100% {  transform: rotate(360deg);  }
    }
    .g-button {
        font-size: @font-size;  height: @button-height;
        background: @button-bg;
        padding: 0 1em;  border-radius: @border-radius;
        border: 1px solid @border-color;  color: @color;
        display: inline-flex;  justify-content: center;
        align-items: center;  vertical-align: middle;
        &:hover {  border-color: @border-hover-bg;  }
        &:active {  background: @button-active-bg;  }
        &:focus {  outline: none;  }
        > .content {  order: 2;  }
        > .icon {  order: 1;  margin-right: .1em;  margin-left: 0;  }
        &.icon-right { > .content {  order: 1;  }
            > .icon {  order: 2;  margin-right: 0;  margin-left: .1em;  } }
        .loading {  animation: spin 1s linear infinite;  }
    }
    .primary{
        font-size: @font-size;  height: @button-height;

    }
</style>