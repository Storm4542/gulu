<template>
    <div class="uploader">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <ol class="fileList">
            <li v-for="file in fileList" :key="file.name">
                <div class="image-wrapper">
                    <template v-if="file.status === 'uploading'">
                        <g-icon class="spin" iconname="loading"></g-icon>
                    </template>
                    <template v-else-if="file.type.indexOf('image') === 0">
                        <img class="uploader-image" :src="file.url" width="32" height="32" alt="">
                    </template>
                    <template v-else>
                        <div class="defaultImage"></div>
                    </template>
                </div>
                <span class="file-name" :class="{[file.status]:file.status}">{{file.name}}</span>
                <g-button iconname="delete" btntype="primary" @click="onRemoveFile(file)">remove</g-button>
            </li>
        </ol>
        <div ref="temp" style="width: 0; height: 0; overflow: hidden;"></div>
    </div>
</template>

<script>
    import GButton from './button/button';
    import GIcon from './icon';

    export default {
        name: "g-uploader",
        components: {GButton, GIcon},
        props: {
            action: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            method: {
                type: String,
                default: 'POST'
            },
            parseResponse: { //处理响应的函数,用于返回图片url
                type: Function,
                required: true
            },
            fileList: {  //已上传的文件列表
                type: Array,
                default: () => []
            }
        },
        methods: {
            onClickUpload() { //点击事件
                let input = this.createInput();
                input.addEventListener('change', () => {
                    this.uploadFile(input.files[0]); //传入文件信息
                    input.remove(); //销毁该input
                });
                input.click();
            },
            createInput() { //生成 input
                this.$refs.temp.innerHTML = '';
                let input = document.createElement('input');
                input.type = 'file';
                this.$refs.temp.appendChild(input);
                return input;
            },
            beforeUploadFile(rawFile, newName) { //上传之前
                //用于生成菊花
                let {size, type} = rawFile;
                this.$emit('update:fileList', [...this.fileList, {name: newName, size, type, status: 'uploading'}]); //更新父组件的fileList（增加文件），改变上传状态为 uploading(用于显示菊花图)
            },
            uploadFile(rawFile) { //上传函数
                let {name} = rawFile; //找到 上床文件名
                let newName = this.generateName(name); //生成新的名字（因为可能会有重复）
                this.beforeUploadFile(rawFile, newName); //生成菊花图
                let formData = new FormData(); //创建表单
                formData.append(this.name, rawFile); // formData 的 append 方法 https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/append
                this.ajax(formData, (response) => { //提交表单
                    console.log('responese', response);
                    let url = this.parseResponse(response); // 使用用户提供的方法，处理成功时的响应,获取预览图(服务器一般返回该图片在服务器上的ID,用户的方法用来 拼接为 地址,)
                    this.afterUploadFile(url, newName); //
                }, (xhr) => {
                    console.log('xhr', xhr);
                    this.uploadError(newName); //处理失败响应
                });
                console.log(this.fileList);
            },
            afterUploadFile(url, newName) {
                let file = this.fileList.filter(item => item.name === newName)[0]; //找到该上传文件
                let copyFile = JSON.parse(JSON.stringify(file)); //深拷贝
                copyFile.url = url;
                copyFile.status = 'success'; //更改状态为 success (去掉菊花)
                let index = this.fileList.indexOf(copyFile); // 找到在 fileList 中的位置
                let fileListCopy = [...this.fileList]; //展开运算符浅拷贝 fileList
                fileListCopy.splice(index, 1, copyFile); // 把更新新状态后的文件 添加到 fileList
                this.$emit('update:fileList', fileListCopy); //提交给父组件
            },
            generateName(name) {
                //有重复name的时候处理一下
                while (this.fileList.filter((file) => file.name === name).length > 0) {
                    let dotIndex = name.lastIndexOf('.');
                    let nameWithOutExtension = name.substring(0, dotIndex);
                    let extension = name.substring(dotIndex);
                    name = nameWithOutExtension + '(1)' + extension;
                }
                return name;
            },
            ajax(formData, success, fail) {
                let xhr = new XMLHttpRequest();
                xhr.open(this.method, this.action);
                xhr.onload = () => {
                    success(xhr.response);
                };
                xhr.onerror = (xhr) => {
                    fail(xhr);
                };
                xhr.send(formData);
            },
            uploadError(newName) { //失败状态
                let errorFile = this.fileList.filter(f => f.name === newName)[0];
                console.log(errorFile);
                let errorFileCopy = JSON.parse(JSON.stringify(errorFile));
                errorFileCopy.status = 'fail';
                let fileList = [...this.fileList];
                let index = fileList.indexOf(errorFile);
                fileList.splice(index, 1, errorFileCopy);
                this.$emit('update:fileList', fileList);
            },
            onRemoveFile(file) { //移除文件
                let copy = JSON.parse(JSON.stringify(this.fileList));
                copy.filter((item, index) => {
                    if (item.name === file.name) {
                        copy.splice(index, 1);
                    }
                });
                this.$emit('update:fileList', copy);
            }

        }
    };
</script>

<style lang="less" scoped>
    @import "../styles/_var";

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .spin {
        animation: spin 2s infinite linear;
    }

    .uploader {
        .fileList {
            list-style: none;
            padding: 0;
            .image-wrapper {
                margin-right: 12px;
            }
            li {
                display: flex;
                align-items: center;
                margin: 8px 0;
                padding: 5px;
                border: 1px solid darken(@grey, 10%);
                .defaultImage {
                    height: 32px;
                    width: 32px;
                    background-color: #ddd;
                }
            }
            .file-name {
                margin-right: auto;
            }
            .success {
                color: green;
            }
            .fail {
                color: red;
            }
            .upload {
                color: #ddd;
            }

        }
    }

</style>