<template>
    <div>
        {{fileList}}
        <div style="margin: 20px">
            <g-uploader action="http://127.0.0.1:3000/upload"
                        name="file"
                        method="POST"
                        :parseResponse="parseResponse"
                        :fileList.sync="fileList"
            >
                <button>上传</button>
                <template slot="tips">
                    <span>支持500kb</span>
                </template>
            </g-uploader>
        </div>
    </div>
</template>

<script>
    import db from '../../tests/fixture/db'
    import Pager from '../pager';
    import GTable from '../table';
    import GUploader from '../uploader';

    function ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
            let result = db.filter(item => item.parent_id === parentId)
            resolve(result)
        })
    }

    export default {
        name: 'demo',
        components: {Pager, GTable, GUploader},
        data() {
            return {
                fileList: [],
            }
        },

        methods: {
            parseResponse(response){
                let object = JSON.parse(response);
                return `http://127.0.0.1:3000/upload/${object.key}`
            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        margin: 40px;
        height: 350px;
        background: #ddd;
    }

    /* .grid-demo {
      height: 100px;
      border: 1px solid gray;
    }

    .sider {
      background: #333;
      width: 200px;
    }

    .sider .fade-enter,
    .sider.fade-leave-active {
      margin-left: -200px;
    }

    .header {
      background: #999;
      height: 100px;
    }

    .footer {
      background: #ccc;
      height: 100px;
    } */

    .demo {
        padding: 50px;
    }
</style>