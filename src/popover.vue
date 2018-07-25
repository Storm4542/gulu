<template>
    <div class="popover" @click="xxx()">
        <div class="content-wrapper" @click.stop v-if="visible">
            <slot  name="content" ></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "g-popover",
        data(){
            return{
                visible:false
            }
        },
        methods:{
            xxx(){
                this.visible = !this.visible;
                if(this.visible===true){
                    this.$nextTick(()=>{
                        let eventHandler=()=>{
                            this.visible = false;
                            document.removeEventListener('click',eventHandler)
                        };
                        document.addEventListener('click',eventHandler)
                    })
                }
            }
        }
    }
</script>

<style lang='less' scoped>
.popover{
    display: inline-block;
    vertical-align: top;
    position: relative;
    .content-wrapper{
        border: 1px solid red;
        box-shadow: 0 0 3px rgb(0,0,0,0.5);
        position: absolute;
        bottom: 100%;
        left: 0;
    }
}
</style>