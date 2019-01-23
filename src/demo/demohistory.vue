<template>
    <div>
        {{fileList}}
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
                >上传</g-button>

            </g-uploader>
        </div>
        <div style="margin: 20px">
            <g-table :columns="columns"
                     :orderBy.sync="orderBy"
                     :selectedItems.sync="selectedItems"
                     striped
                     :compact="false"
                     :bordered="true"
                     :height="400"
                     :data-source="dataSource"
                     :loading="loading"
                     expend-field="description"
                     @update:orderBy="load"></g-table>
        </div>
        <div style="margin: 20px">
            <g-table :columns="columns" :height="400" :compact="true" :bordered="true"
                     :data-source="dataSource"></g-table>
        </div>

        <div>
            <g-pager :total-page="20" :current-page.sync="currentPage"></g-pager>
        </div>
        <div>

            <g-nav :selected.sync="selectedNav" vertical style="width: 200px ">
                <g-nav-item name="home">首页</g-nav-item>
                <g-sub-nav name="about">
                    <template slot="title">关于</template>
                    <g-nav-item name="culture">企业文化</g-nav-item>
                    <g-nav-item name="developers">开发团队</g-nav-item>
                    <g-sub-nav name="contacts">
                        <template slot="title">联系方式</template>
                        <g-nav-item name="wechat">微信</g-nav-item>
                        <g-nav-item name="qq">QQ</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
                <g-nav-item name="hire">招聘</g-nav-item>
            </g-nav>

            <g-nav :selected.sync="selectedNav" style="margin-top: 150px ">
                <g-nav-item name="home">首页</g-nav-item>
                <g-sub-nav name="about">
                    <template slot="title">关于</template>
                    <g-nav-item name="culture">企业文化</g-nav-item>
                    <g-nav-item name="developers">开发团队</g-nav-item>
                    <g-sub-nav name="contacts">
                        <template slot="title">联系方式</template>
                        <g-nav-item name="wechat">微信</g-nav-item>
                        <g-nav-item name="qq">QQ</g-nav-item>
                    </g-sub-nav>
                </g-sub-nav>
                <g-nav-item name="hire">招聘</g-nav-item>
            </g-nav>
        </div>


        <div>
            <g-slides :selected.sync='slidesSelected1' v-bind:reverse-play="reversePlay">
                <g-slides-item name='1'>
                    <div class="content">
                        1
                    </div>
                </g-slides-item>
                <g-slides-item name='2'>
                    <div class="content">
                        2
                    </div>
                </g-slides-item>
                <g-slides-item name='3'>
                    <div class="content">
                        3
                    </div>
                </g-slides-item>
            </g-slides>

        </div>
        <div class="demo">
            <g-cascader :source.sync="source" popover-height="200px" :selected.sync="selected"
                        :load-data="loadData"></g-cascader>
            <!--:selected="selected"-->
            <!--@update:selected="selected = $event"-->
        </div>

        <div class="demo">
            <g-collapse :selected.sync="selected1">
                <g-collapse-item title="显示多个" name="1">显示多个</g-collapse-item>
                <g-collapse-item title="标题2" name="2">内容2</g-collapse-item>
                <g-collapse-item title="标题3" name="3">内容3</g-collapse-item>
            </g-collapse>
            {{selected1}}
            <br><br><br><br><br><br>
            <g-collapse :selected.sync="selected2" single>
                <g-collapse-item title="只显示一个" name="1">只显示一个</g-collapse-item>
                <g-collapse-item title="标题2" name="2">内容2</g-collapse-item>
                <g-collapse-item title="标题3" name="3">内容3</g-collapse-item>
            </g-collapse>
            {{selected2}}

        </div>
        <div class="demo">
            <g-popover position="top">
                <template slot="content">
                    popover内容
                </template>
                <g-button btntype="success">top</g-button>
            </g-popover>
            <g-popover position="bottom">
                <template slot="content">
                    popover内容
                </template>
                <g-button btntype="success">bottom</g-button>
            </g-popover>
            <g-popover position="left">
                <template slot="content">
                    popover内容
                </template>
                <g-button btntype="success">left</g-button>
            </g-popover>
            <g-popover position="right">
                <template slot="content">
                    popover内容
                </template>
                <g-button btntype="success">right</g-button>
            </g-popover>
        </div>
        <div class="demo">
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
        </div>
        <div class="demo">
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
            <br>
            <br>
            <br>

            <g-tabs :selected.sync="selectedTab" direction="vertical">
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
        </div>
        <div class="demo">
            <g-button btntype="primary" @click="showToast1()">top</g-button>
            <g-button btntype="success" @click="showToast2()">middle</g-button>
            <g-button btntype="warning" @click="showToast3()">bottom</g-button>
        </div>
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
        <div class="demo">
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
        </div>
        <br/>
        <br/>
        <div class="box">
            <g-input value='default' v-model="message"></g-input>

        </div>
        <div class="box">
            <g-input value='disabled' :disabled='true'></g-input>

        </div>
        <div class="box">
            <g-input value='readonly' :readonly='true'></g-input>

        </div>
        <div class="box">
            <g-input value="王二麻子" error="用户名不能少于5位哦"></g-input>
        </div>
        <br/>
        <br/>
        <br/>
        <div class="demo">

            <g-button iconname='setting' btntype="primary" :loading="loading1" @click='loading1 = !loading1'>
                click
            </g-button>
            <g-button iconname='setting' btntype="success" :loading="loading2" icon-position="right"
                      @click='loading2 = !loading2'>
                按钮
            </g-button>
            <g-button btntype="warning" iconname='setting' :loading="loading3" :success="success1" icon-position="right"
                      @click="clickSuccess('success',$event)">
                提交
            </g-button>
            <g-button iconname="error" btntype="danger">警告</g-button>
            <g-button-group>
                <g-button iconname='left'>
                    上一页
                </g-button>
                <g-button iconname='setting'>
                    更多
                </g-button>
                <g-button iconname='right' icon-position="right">
                    下一页
                </g-button>

            </g-button-group>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                fileList: [],
                currentPage: 2,
                selectedNav: 'home',
                reversePlay: false,
                slidesSelected1: '1',
                slidesSelected2: '2',
                selected: [],
                source: [],
                loading1: false,
                loading2: true,
                loading3: false,
                success1: true,
                message: 'message',
                selectedTab: 'sports',
                selected1: ['2', '3'],
                selected2: ['2'],
                loading: false,
                selectedItems: [],
                columns: [
                    {text: '姓名', field: 'name', width: 100},
                    {text: '分数', field: 'score'}
                ],
                orderBy: {
                    name: 'desc',
                    score: 'asc'
                },
                dataSource: [
                    {
                        id: 1,
                        name: '方方',
                        score: 100,
                        description: 'XXXXXXXXXXXXXXXXX'
                    },
                    {
                        id: 2,
                        name: '刘晓智',
                        score: 22,
                        description: 'AAAAAAAAAAAAAA'
                    },
                    {
                        id: 3,
                        name: '刘琦',
                        score: 55,
                        description: 'BBBBBBBBBBBBBBB'
                    },
                    {
                        id: 4,
                        name: '王伟',
                        score: 34,
                        description: 'RRRRRRRRRRRRRR'
                    },
                    {
                        id: 5,
                        name: '詹梦琪',
                        score: 78
                    },
                    {
                        id: 6,
                        name: '李自成',
                        score: 90
                    }, {
                        id: 7,
                        name: '方方',
                        score: 100
                    },
                    {
                        id: 8,
                        name: '刘晓智',
                        score: 22
                    },
                    {
                        id: 9,
                        name: '刘琦',
                        score: 55
                    },
                    {
                        id: 10,
                        name: '王伟',
                        score: 34
                    },
                    {
                        id: 11,
                        name: '詹梦琪',
                        score: 78
                    },
                    {
                        id: 12,
                        name: '李自成',
                        score: 90
                    }
                ],

            }
        },
        created() {
            ajax(0).then(res => {
                this.source = res
            })
        },
        methods: {
            parseResponse(response) {
                let object = JSON.parse(response);
                return `http://127.0.0.1:3000/upload/${object.key}`;
            },
            //让用户定义一个loadData函数传给我
            loadData({id}, callback) {
                ajax(id).then(result => {
                    //用户通过自己的ajax获取到第n层的result，然后通过callback传给我
                    //callback负责更新下一层的数据
                    //callback在后台写好
                    callback(result)
                })
            },
            inputChange(e) {
                console.log(e)
            },
            clickSuccess(message, event) {
                let btnElement = event.currentTarget
                let iconElement = event.currentTarget.querySelector('use')
                let iconname = iconElement.getAttribute('xlink:href')
                let svgElement = event.currentTarget.querySelector('svg')
                if (iconname === '#i-success') {
                    return ''
                } else {
                    this.loading3 = !this.loading3 //用户需要根据自己的loading修改
                    setTimeout(() => {
                        iconElement.setAttribute('xlink:href', '#i-success')
                        svgElement.setAttribute('class', 'g-icon  icon')
                    }, 1000)
                }
            },
            showToast1() {
                this.$toast('弹出toast', {
                    closeButton: {
                        text: '知道了',
                        callback: () => {
                            alert('用户说他知道了')
                        }
                    },
                    enableHtml: false,
                    autoCloseDelay: 3,
                    position: 'top'
                })
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
                })
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
                })
            },
            load() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                }, 3000)
            },

        }
    }
</script>

<style>
</style>
