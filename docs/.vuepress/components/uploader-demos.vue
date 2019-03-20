<template>
    <div style="margin: 20px">
        <div>支持500kb</div>
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
            >上传
            </g-button>

        </g-uploader>
    </div>
</template>

<script>
    import GUploader from './src/uploader';
    import GButton from './src/button/button';

    export default {
        name: 'uploader-demos',
        components: {GUploader, GButton},
        data() {
            return {
                fileList: [],
            };
        },
        methods: {
            parseResponse(response) {
                let object = JSON.parse(response);
                return `http://127.0.0.1:3000/upload/${object.key}`;
            },
        }
    };
</script>