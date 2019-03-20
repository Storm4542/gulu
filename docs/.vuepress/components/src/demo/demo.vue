<template>
    <div>
        <div class="test">
            <g-date-picker :value="value" @updateDay="value = $event" :scope="scope"></g-date-picker>
        </div>
    </div>
</template>

<script>
    import db from "../../tests/fixture/db";
    import Pager from "../pager";
    import GTable from "../table";
    import GUploader from "../uploader";
    import GSticky from '../sticky'
    import GButton from "../button/button";
    import GScroll from '../scroll'
    import GDatePicker from '../date-picker/date-picker'

    function ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
            let result = db.filter(item => item.parent_id === parentId);
            resolve(result);
        });
    }

    export default {
        name: "demo",
        components: {Pager, GTable, GUploader, GSticky, GScroll, GDatePicker},
        data() {
            return {
                value: new Date(),
                scope:[new Date(1992,11),new Date()],
            };
        },
        mounted() {


        },
        methods: {}
    };
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .test {
        padding: 100px;
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