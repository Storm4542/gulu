<template>
    <div>
        <g-nav :selected.sync="selectedNav" :multiple="false" vertical style="width: 200px ">
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

        <g-nav :selected.sync="selectedNav" :multiple="false"  style="margin-top: 150px ">
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
</template>

<script>
    import db from '../../tests/fixture/db'

    function ajax(parentId = 0) {
        return new Promise((resolve, reject) => {
            let result = db.filter(item => item.parent_id === parentId)
            resolve(result)
        })
    }

    export default {
        name: 'demo',
        data() {
            return {
                selectedNav:['home'],
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
                selected2: ['2']
            }
        },
        created() {
            ajax(0).then(res => {
                this.source = res
            })
        },
        methods: {
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