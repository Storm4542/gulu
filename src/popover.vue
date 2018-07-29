<template>
    <div class="popover" @click="onClick">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "g-popover",
        data() {
            return {
                visible: false
            }
        },
        methods: {
            positionContent(){
                document.body.appendChild(this.$refs.contentWrapper); //把contentWrapper移到外面去，防止overflow:hidden
                let {top, left} = this.$refs.triggerWrapper.getBoundingClientRect();
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px';
                this.$refs.contentWrapper.style.left = left + window.scrollY + 'px';
            },
            onClickDocument(event){
                if (!this.$refs.contentWrapper.contains(event.target)) {  //如果点击的不是contentWrapper的话
                    this.close();   //就让contentWrapper消失
                }
            },
            open(){
                this.visible = true;
                this.$nextTick(() => {
                    this.positionContent(); //定位content
                    document.addEventListener('click', this.onClickDocument)// 添加事件监听，目标是点击document的时候让content消失。
                })
            },
            close(){
              this.visible = false;
              document.removeEventListener('click', this.onClickDocument) //取消监听click事件。

            },
            onClick(event) {
                if (this.$refs.triggerWrapper.contains(event.target)) { //如果点击的是tirggerWrapper，也就是button的话
                    //显示或者消失content
                    if (this.visible === true) {  //如果是显示状态
                      this.close();
                    }else {
                        this.open()
                    }
                }


            }
        },
    }
</script>

<style lang='less' scoped>
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }

    .content-wrapper {
        border: 1px solid red;
        box-shadow: 0 0 3px rgb(0, 0, 0, 0.5);
        position: absolute;
        transform: translateY(-100%);
    }
</style>