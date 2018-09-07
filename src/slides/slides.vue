<template>
    <div class="slides" @touchstart='onTouchStart' @touchmove='onTouchMove' @touchend='onTouchEnd'
         @mouseenter='onMouseEnter' @mouseleave='onMouseLeave'>
        <div class="slides-wrapper">
            <div class="slides-arrow">
                <div class="right" @click="arrowRight">
                    <g-icon iconname='right'></g-icon>
                </div>
                <div class="left" @click="arrowLeft">
                    <g-icon iconname='left'></g-icon>
                </div>
            </div>
            <div class="slides-window">
                <slot/>
            </div>
        </div>
        <div class="slides-dots">
      <span v-for="index in childrenLength" @click="select(index-1)" :class="{active:selectedIndex === index-1}">
        {{index}}
      </span>
        </div>

    </div>
</template>

<script>
    import GIcon from '../icon'

    export default {
        name: 'g-slides',
        components: {
            GIcon
        },
        props: {
            selected: {
                type: String
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            reversePlay: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                childrenLength: undefined,
                lastSelected: undefined,
                timerId: undefined,
                startTouch: null
            }
        },
        mounted() {
            this.childrenLength = this.getChildren.length
            this.updateChildren()
            this.autoPlay && this.playAutomatically()
        },
        updated() {
            this.updateChildren()
        },
        computed: {
            selectedIndex() {
                let index = this.getNames().indexOf(this.getSelected())
                return index === -1 ? 0 : index
            },
            getChildren() {
                //获取所有名字是 g-slides-item的孩子，其他的不要
                return this.$children.filter(vm => vm.$options.name === 'g-slides-item')
            }
        },
        methods: {
            arrowRight() {
                this.select(this.selectedIndex + 1)
            },
            arrowLeft() {
                this.select(this.selectedIndex - 1)
            },
            onTouchStart(e) {
                this.pausePlay()

                this.startTouch = e.touches[0]
            },
            onTouchMove() {
            },
            onTouchEnd(e) {
                let endTouch = e.changedTouches[0]
                let {clientX: x1, clientY: y1} = this.startTouch
                let {clientX: x2, clientY: y2} = endTouch
                //假设小与30度角滑动才滑动 30度三角形垂直边等于斜边的1/2
                let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) //斜边
                let deltaY = Math.abs(y2 - y1); //垂直边
                let rate = distance / deltaY; //比例
                if (rate > 2) {
                    if (x2 > x1) {
                        this.select(this.selectedIndex - 1)
                    } else {
                        this.select(this.selectedIndex + 1)
                    }
                }
                this.$nextTick(() => {
                    this.playAutomatically()
                })
            },
            onMouseEnter() {
                this.pausePlay()
                this.timerId = undefined //把timer放空
            },
            onMouseLeave() {
                this.playAutomatically()
            },
            select(newIndex) {
                this.lastSelected = this.selectedIndex
                if (newIndex === -1) {
                    newIndex = this.getNames().length - 1
                }
                if (newIndex === this.getNames().length) {
                    newIndex = 0
                }
                this.$emit('update:selected', this.getNames()[newIndex])
            },
            getNames() {
                return this.getChildren.map(vm => vm.name) //收集所有的name
            },
            getSelected() {
                return this.selected || this.$children[0].name //获取当前 selected
            },
            updateChildren() {
                let selected = this.getSelected()
                this.$children.forEach(vm => {
                    let reverse = this.selectedIndex < this.lastSelected
                    //判断是从左到右，还是从右到左滑动
                    //边界情况判断,在自动播放的时候是无缝的,用户点击小点的时候是有缝的
                    if (this.timerId) {
                        if (
                            this.lastSelected === this.$children.length - 1 &&
                            this.selectedIndex === 0
                        ) {
                            reverse = false
                        }
                        if (
                            this.lastSelected === 0 &&
                            this.selectedIndex === this.$children.length - 1
                        ) {
                            reverse = true
                        }
                    }
                    vm.reverse = reverse
                    this.$nextTick(() => {
                        vm.visible = vm.name === selected
                    })
                })
            },
            playAutomatically() {
                if (this.timerId) {
                    return //如果当前有timerid了，说明已有动画，我就不动了
                }
                const names = this.getNames()
                //用setTimeout 模拟 setInterval
                let run = () => {
                    let currentNameIndex = names.indexOf(this.getSelected())
                    let newindex;
                    if(this.reversePlay){
                        newindex = currentNameIndex -1
                        this.select(newindex);
                    }else {
                        newindex = currentNameIndex + 1 //获取当前name在names中的位置,当前index
                        this.select(newindex) //告诉外界选择了该index
                    }
                    this.timerId = setTimeout(run, 3000)
                }
                this.timerId = setTimeout(run, 3000)
            },
            pausePlay() {
                window.clearTimeout(this.timerId)
            }
        }
    }
</script>

<style lang="less" scoped>
    .slides {
        .slides-wrapper {
            position: relative;
            .slides-arrow {
                width: 100%;
                .right {
                    position: absolute;
                    right: 5%;
                    top: 50%;
                }
                .left {
                    position: absolute;
                    left: 5%;
                    top: 50%;
                }
            }
            .slides-window {
                display: flex;
                overflow: hidden;
            }
        }
        .slides-dots {
            padding: 8px 0;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                text-align: center;
                display: inline-block;
                height: 20px;
                width: 20px;
                line-height: 20px;
                font-size: 12px;
                background-color: #ddd;
                border-radius: 50%;
                margin: 0 8px;
                &:hover {
                    cursor: pointer;
                }
                &.active {
                    background: black;
                    color: #ffffff;
                }
                &.active:hover {
                    cursor: default;
                }
            }
        }
    }
</style>

