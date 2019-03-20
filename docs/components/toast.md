---
title: Toast
sidebarDepth: 2
---
# Toast
使用方法

<ClientOnly>

<toast-demos></toast-demos>

</ClientOnly>

Toast是以插件形式开发的，所以引入的时候需要用到 Vue.use(Plugin)

```vue
<template>
    <div>
        <g-button btntype="primary" @click="showToast1()">top</g-button>
        <g-button btntype="success" @click="showToast2()">middle</g-button>
        <g-button btntype="warning" @click="showToast3()">bottom</g-button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Toast from '../../../src/toast'
    import Button from '../../../src/button'
    import Plugin from '../../../src/plugin'
    Vue.use(Plugin);
    export default {
        name: "toast-demos",
        components: {
            'g-toast': Toast,
            'g-button': Button
        },
        methods: {
            showToast1() {
                this.$toast('弹出toast', {
                    closeButton: {
                        text: '知道了',
                        callback: () => {
                            alert('用户说他知道了')
                        }
                    },
                    enableHtml: false,
                    autoCloseDelay: 30,
                    position: 'top'
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
                    enableHtml: false,
                    autoCloseDelay: 3,
                    position: 'middle'
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
                    enableHtml: false,
                    autoCloseDelay: 3,
                    position: 'bottom'
                });
            }
        }
    }
</script>
```




| 属性           | 说明                                                         | 类型    | 默认值 |
| -------------- | ------------------------------------------------------------ | ------- | ------ |
| Closebutton    | 用户定义是否出现一个关闭按钮 text : 按钮文字  callback: 点击按钮的回调 | Object  | -      |
| enableHtml     | Toast里是否允许加载 HTML 语言                                | Boolean | False  |
| autoCloseDelay | 几秒后自动关闭                                               | Number  | 5      |
| position       | 弹出位置，可选值 : top , middle , bottom                     | String  | Top    |

