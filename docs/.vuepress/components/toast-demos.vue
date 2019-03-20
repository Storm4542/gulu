<template>
    <div>
        <g-button btntype="primary" @click="showToast1()">top</g-button>
        <g-button btntype="success" @click="showToast2()">middle</g-button>
        <g-button btntype="warning" @click="showToast3()">bottom</g-button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Toast from './src/toast';
    import Button from './src/button/button';
    import Plugin from './src/plugin';

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
                            alert('用户说他知道了');
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
                            alert('用户说他知道了');
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
                            alert('用户说他知道了');
                        }
                    },
                    enableHtml: false,
                    autoCloseDelay: 3,
                    position: 'bottom'
                });
            }
        }
    };
</script>

<style lang='less' scoped>
</style>