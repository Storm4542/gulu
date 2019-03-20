<template>
    <div>
        <div>
            <g-button>默认</g-button>
            <g-button iconname='setting' btntype="primary" :loading="loading1" @click='loading1 = !loading1'>
                点击
            </g-button>
            <g-button iconname='setting' btntype="success" :loading="loading2" icon-position="right"
                      @click='loading2 = !loading2'>
                点击
            </g-button>
            <g-button btntype="warning"
                      iconname='setting'
                      :loading="loading3"
                      :success="success1"
                      icon-position="right"
                      @click="clickSuccess('success',$event)"
            >
                提交
            </g-button>
            <g-button iconname="error" btntype="danger">警告</g-button>
        </div>


    </div>
</template>

<script>
    import Button from './src/button/button';

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
            };
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
                    }, 1000);

                }

            },
        }
    };
</script>

<style lang='less' scoped>
  @import "styles/_var";
</style>