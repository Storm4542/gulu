---
title: uploader
sidebarDepth: 2
---
# Uploader
使用方法

<ClientOnly>

<uploader-demos></uploader-demos>

</ClientOnly>

文件上传组件

拥有上传并预览的功能。

```vue
   <div>
            <div>一个文件上传组件</div>
            <g-uploader
                    action="http://127.0.0.1:3000/upload"
                    name="file"
                    method="POST"
                    :parseResponse="parseResponse"
                    :fileList.sync="fileList"
            >
                <g-button
                        iconname="upload"
                        btntype="success"
                >上传</g-button>

            </g-uploader>
	</div>
```




| 属性          | 说明                 | 类型   | 默认值 |
| ------------- | -------------------- | ------ | ------ |
| action        | 上传地址             | String | -      |
| name          | 上传文件的名称       | String | -      |
| method        | 上传方法             | String | POST   |
| parseResponse | 得到返回值以后的回调 | String | -      |
| fileList.sync | 已上传的文件列表     | Array  | [ ]    |