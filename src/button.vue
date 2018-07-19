<template>
    <button class="g-button"
            :class="{[`icon-${iconPosition}`]:true ,[btntype]:true}"
            @click="$emit('click',$event)">
        <g-icon class="loading icon" v-if="loading"   iconname="loading"></g-icon>
        <g-icon class="icon" v-if='iconname&&!loading' :iconname='iconname'></g-icon>
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
            success:{
                type:Boolean,
                default:false
            },
            btntype:{
                type:String,
                validate:function(value){
                    ['primary','success','warning','danger'].map((className)=>{
                        if(value === className){
                            return value
                        }
                        return false
                    })
                }
            }

        }
    }
</script>

<style lang="less" scoped>
        @font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
        @button-height: 32px;
        @font-size: 14px;
        @button-bg: white;
        @button-active-bg: #eee;
        @border-radius: 3px;
        @color: #333;
        @border-color: #999;
        @border-hover-bg: #666;

        @primary-color:#fff;
        @primary-bg-color:#032ED5;
        @primary-border-color:#032ED5;


    @keyframes spin { 0% {  transform: rotate(0deg);  }
        100% {  transform: rotate(360deg);  }
    }
    .g-button {
        font-family: @font-family;
        font-size: @font-size;  height: @button-height;
        background: @button-bg;
        padding: 0 2em;  border-radius: @border-radius;
        border: 1px solid @border-color;  color: @color;
        display: inline-flex;  justify-content: center;
        align-items: center;  vertical-align: middle;
        text-align: center;
        &:hover {  border-color: @border-hover-bg;  }
        &:active {  background: @button-active-bg;  }
        &:focus {  outline: none;  }
        > .content {  order: 2;  }
        > .icon {  order: 1;  margin-right: .5em;  margin-left: 0;  }
        &.icon-right { > .content {  order: 1;  }
            > .icon {  order: 2;  margin-right: 0;  margin-left: .5em;  } }
        .loading {  animation: spin 1s linear infinite;  }
    }
    .primary{
        background : @primary-bg-color ;
        color: @primary-color;
        font-weight: bold;
        border-color: @primary-border-color ;
        > .icon{
            fill: @primary-color;
        }
        &:active{
            background-color: lighten( @primary-bg-color,20%);
        }
    }
</style>