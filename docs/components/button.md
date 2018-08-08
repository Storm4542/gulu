---
title: Button
sidebarDepth: 2
---
# 按钮

使用方法
<ClientOnly>
<button-demos></button-demos>
</ClientOnly>

```html
<g-button>默认</g-button>
    <g-button   iconname='setting'
                btntype="primary"
                :loading="loading1"
                @click='loading1 = !loading1'>
                点击
    </g-button>
    <g-button   iconname='setting'
                btntype="success"
                :loading="loading2"
                icon-position="right"
                @click='loading2 = !loading2'>
                点击
    </g-button>
    <g-button btntype="warning"
              iconname='setting'
              :loading="loading3"
              :success="success1"
              icon-position="right"
              @click="clickSuccess('success',$event)">
               提交
    </g-button>
    <g-button iconname="error" btntype="danger">警告</g-button>
        
```



| 属性            | 说明                                       | 类型      | 默认值   |
| :------------ | ---------------------------------------- | ------- | ----- |
| btntype       | 按钮类型，可选值为 primary,success,warning,danger或者不设置 | String  | -     |
| iconname      | 按钮图标，用户可自己引入SVG文件，图标名称起名为“g-xxxx”即可使用iconname='xxxx' | String  | -     |
| loading       | 是否出现loading图标                            | Boolean | false |
| icon-position | icon的位置 ，可选值为 left ,right                | String  | left  |
| success       | 配合loading一起使用，下方示例代码                     | Boolean | -     |

```javascript
 export default {
        name: "button-demos",
        components: {
            'g-button': Button
        },
        data() {
            return {
                loading1: false,
                loading2: true,
                loading3: false,
                success1: true,
            }
        },
        methods: {
            clickSuccess(message, event) {
                let btnElement = event.currentTarget;
                let iconElement = event.currentTarget.querySelector('use');
                let iconname = iconElement.getAttribute('xlink:href');
                let svgElement = event.currentTarget.querySelector('svg');
                if (iconname === '#i-success') {
                    return '';
                } else {
                    this.loading3 = !this.loading3; //用户需要根据自己的loading修改
                    setTimeout(() => {
                        iconElement.setAttribute('xlink:href', '#i-success');
                        svgElement.setAttribute('class', 'g-icon  icon');
                    }, 1000)

                }

            },
        }
    }
```

