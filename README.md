# 轱辘 —— 一个Vue UI 组件库
[![Build Status](https://travis-ci.org/Storm4542/gulu.svg?branch=master)](https://travis-ci.org/Storm4542/gulu) 
![npm](https://img.shields.io/npm/v/npm.svg)

## 介绍
## 开始使用
1.添加 CSS 样式

使用本框架前,请在 CSS 中开启 border-box

```css

*::before, * , *::after{box-sizing:border-box;}

```
2.安装gulu 
```javascript
npm install --save gulu_zty
```
## 文档

1. Button

   ```html
    <g-button 	btntype="warning"
               iconname='setting'
               :loading="loading3"
               :success="success1"
                icon-position="right"
                @click="changeloading('success',$event)">
               提交
           </g-button>
   ```

   - btntype:Button的样式 默认样式,primary,success,warning,danger

   - iconname: icon的svg名字,需要用户自己引入svg文件,命名规则 `i-setting` ,使用时`iconname = setting`,推荐使用iconfont

   - :loading: 点击按钮是否有loading样式 `loading3:true/false`

   - :success: 点击按钮后经过loading,最后显示完成标志.`success1:true/false`,配合`changeloading($event)`使用

   - icon-positon:图标显示在字的位置`right || left`

2. input 

   ```html
   <g-input value = 'xxx'
            :disable = 'disable'
            :readonly = 'true'
            v-model = 'message'
            ></g-input>
   ```

   支持disabled,readonly,focus,blur事件,支持双向绑定


## 提问

## 变更记录
## 联系方式
## 贡献代码