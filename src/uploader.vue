<template>
    <div class="uploader">
        <div @click="onClickUpload">
            <slot></slot>
        </div>
        <ol>
            <li v-for="file in fileList" :key="file.name">
                {{file.name}}
                <template v-if="file.status === 'uploading'">
                    菊花
                </template>
                <img :src="file.url" width="100" alt="">
                <button @click="onRemoveFile(file)">remove</button>
                {{file.status}}
            </li>
        </ol>
        <div ref="temp" style="width: 0; height: 0; overflow: hidden;"></div>
    </div>
</template>

<script>
    export default {
        name: "g-uploader",
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
            onClickUpload() {
                let input = this.createInput();
                input.addEventListener('change', () => {
                    this.uploadFile(input.files[0]);
                    input.remove()
                });
                input.click()
            },
            createInput() {
                let input = document.createElement('input');
                input.type = 'file';
                this.$refs.temp.appendChild(input);
                return input
            },
            beforeUploadFile(rawFile, newName) {
                //用于生成菊花
                let {size, type} = rawFile;
                this.$emit('update:fileList', [...this.fileList, {name: newName, size, type, status: 'uploading'}])
            },
            uploadFile(rawFile) {
                let {name} = rawFile;
                let newName = this.generateName(name)
                this.beforeUploadFile(rawFile, newName);
                let formData = new FormData();
                formData.append(this.name, rawFile);
                this.ajax(formData, (response) => {
                    let url = this.parseResponse(response);
                    this.afterUploadFile(url, newName)
                }, () => {
                    this.uploadError(newName);
                });
                console.log(this.fileList);
            },
            afterUploadFile(url, newName) {
                let file = this.fileList.filter(item => item.name === newName)[0];
                let copyFile = JSON.parse(JSON.stringify(file));
                copyFile.url = url;
                copyFile.status = 'success';
                let index = this.fileList.indexOf(copyFile);
                let fileListCopy = [...this.fileList]
                fileListCopy.splice(index, 1, copyFile)
                this.$emit('update:fileList', fileListCopy)
            },
            generateName(name) {
                //有重复name的时候处理一下
                while (this.fileList.filter((file) => file.name === name).length > 0) {
                    let dotIndex = name.lastIndexOf('.');
                    let nameWithOutExtension = name.substring(0, dotIndex);
                    let extension = name.substring(dotIndex)
                    name = nameWithOutExtension + '(1)' + extension
                }
                return name
            },
            ajax(formData, success, fail) {
                let xhr = new XMLHttpRequest();
                xhr.open(this.method, this.action);
                xhr.onload = () => {
                    success(xhr.response)
                };
                xhr.onerror = () => {
                    fail()
                }
                xhr.send(formData)
            },
            uploadError(newName) {
                let errorFile = this.fileList.filter(f => f.name === newName)[0];
                console.log(errorFile);
                let errorFileCopy = JSON.parse(JSON.stringify(errorFile));
                errorFileCopy.status = 'fail';
                let fileList = [...this.fileList];
                let index = fileList.indexOf(errorFile);
                fileList.splice(index, 1, errorFileCopy);
                this.$emit('update:fileList', fileList);
            },
            onRemoveFile(file) {
                let copy = JSON.parse(JSON.stringify(this.fileList));
                copy.filter((item, index) => {
                    if (item.name === file.name) {
                        copy.splice(index, 1)
                    }
                });
                this.$emit('update:fileList', copy)
            }

        }
    }
</script>

<style lang="less" scoped>
    @import "_var";

    .uploader {
        border: 1px solid;
    }
</style>