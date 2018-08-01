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
            v-model = 'message'>
   </g-input>
   ```

   支持disabled,readonly,focus,blur事件,支持双向绑定

3. grid

   ```html
   <g-row gutter="10" align="center">
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
               <g-col :span="24" :ipad="{span:8}" :pc="{span:4}">
                   <div class="grid-demo"></div>
               </g-col>
   </g-row>
   ```

   - gutter 设置间隔 1~24

   - align 设置left ,center,right 

   - span 设置默认值，并有ipad ,narrowPc , pc ,widePc 屏幕大小可选

4. layout

   可以设置页面layout, 例如：

   ```html
    <g-layout style="height: 100vh">
           <g-sider>
           </g-sider>
           <g-layout>
               <g-header>header</g-header>
               <g-content>
                   content
               </g-content>
               <g-footer>footer</g-footer>
           </g-layout>
   </g-layout>
   ```

5. Toast

   ```html
   <g-button btntype="primary" @click="showToast1()">top</g-button>
   <g-button btntype="success" @click="showToast2()">middle</g-button>
   <g-button btntype="warning" @click="showToast3()">bottom</g-button>
   ```

   ```javascript
     showToast1() {
               this.$toast('弹出toast', {
                   closeButton: {
                       text: '知道了',
                       callback: () => {
                           alert('用户说他知道了')
                       }
                   },
                   enableHtml:false,
                   autoCloseDelay:3,
                   position:'top'
               });
           },
           showToast2() {
               this.$toast('弹出toast', {
                   closeButton: {
                       text: '知道了',
                       callback: () => {
                           alert('用户说他知道了')
                       }
                   },
                   enableHtml:false,
                   autoCloseDelay:3,
                   position:'middle'
               });
           },
           showToast3() {
               this.$toast('弹出toast', {
                   closeButton: {
                       text: '知道了',
                       callback: () => {
                           alert('用户说他知道了')
                       }
                   },
                   enableHtml:false,
                   autoCloseDelay:3,
                   position:'bottom'
               });
           }
   ```

   - closeButton : Object 关闭按钮，并可以添加回调
   - enableHtml ：Boolean  是否允许Toast内执行Html
   - autoCloseDelay: Number 自动关闭延时
   - position: top ,middle , bottom .  Toast显示在页面的部位

6. Tabs

   ```html
    	<g-tabs :selected.sync="selectedTab" direction="horizontal">
               <g-tabs-head>
                   <g-tabs-item name="it">
                       <g-icon iconname="setting"></g-icon>
                       互联网
                   </g-tabs-item>
                   <g-tabs-item name="finance" :disable='true'>财经</g-tabs-item>
                   <g-tabs-item name="sports">体育</g-tabs-item>
                   <template slot="action">
                       <button>设置</button>
                   </template>
               </g-tabs-head>
               <g-tabs-body>
                   <g-tabs-pane name="it">互联网相关</g-tabs-pane>
                   <g-tabs-pane name="finance">财经相关</g-tabs-pane>
                   <g-tabs-pane name="sports">体育相关</g-tabs-pane>
   
               </g-tabs-body>
          </g-tabs>
   ```

   - :selected.sync 选择默认展示的pane
   - direction : horizontal (default),vertical ,水平展示或者垂直展示
   - name: 每一个item和pane必须添加，对应关系

7. popover

   ```html
   <g-popover position="top" trigger="hover">
       <template slot="content">
           popover内容
       </template>
       <g-button btntype="success">top</g-button>
   </g-popover>
   <g-popover position="bottom" trigger="hover">
       <template slot="content">
           popover内容
       </template>
       <g-button btntype="success">bottom</g-button>
   </g-popover>
   <g-popover position="left" trigger="hover">
       <template slot="content">
           popover内容
       </template>
       <g-button btntype="success">left</g-button>
   </g-popover>
   <g-popover position="right" trigger="hover">
       <template slot="content">
           popover内容
       </template>
       <g-button btntype="success">right</g-button>
   </g-popover>
   ```

   - positon : top ,left ,bottom ,right  弹出位置
   - trigger: 不写即为click ,或者为hover
   - slot = ‘content’ ，必须填写。

## 提问

## 变更记录
## 联系方式
## 贡献代码