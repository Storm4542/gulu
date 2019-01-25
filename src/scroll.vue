<template>
    <div ref="parent" class="gulu-scroll-wrapper" @wheel="onWheel" @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave">
        <div ref="child" :style="{transform:`translateY(${contentY}px)`}" class="gulu-scroll">
            <slot></slot>
        </div>
        <div v-show="scrollBarVisible" class="gulu-scroll-track">
            <div class="gulu-scroll-bar" ref="bar" @mousedown="onMouseDownScrollBar" @selectstart="onSelectScrollBar">
                <div class="gulu-scroll-bar-inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "g-scroll",
        data() {
            return {
                scrollBarVisible: false,
                isScrolling: false,
                startPosition: undefined,
                endPosition: undefined,
                scrollX: 0,
                scrollY: 0,
                contentY: 0,
                parentHeight: '', //窗口高度
                childHeight: '',//content高度
                barHeight: '', // bar 的高度
                maxHeight: undefined,
            }
        },
        mounted() {
            this.listenToDocument(); //监听 document
            //滚轮移动内容
            this.parentHeight = this.$refs.parent.getBoundingClientRect().height;
            this.childHeight = this.$refs.child.getBoundingClientRect().height;
            this.calculateContentYMax(); //计算maxHeight 用于限制 contentY
            //计算bar的高度和位置
            this.updateScrollBar();
        },
        methods: {
            listenToDocument() {
                //滑块在滑轨移动
                document.addEventListener('mousemove', e => this.onMouseMoveScrollBar(e))
                document.addEventListener('mouseup', () => this.onMouseUpScrollBar())
            },
            calculateContentYMax() {//计算maxHeight 用于限制 contentY
                let {borderTopWidth, borderBottomWidth, paddingTop, paddingBottom} = window.getComputedStyle(this.$refs.parent);
                borderTopWidth = parseInt(borderTopWidth);
                borderBottomWidth = parseInt(borderBottomWidth);
                paddingTop = parseInt(paddingTop);
                paddingBottom = parseInt(paddingBottom);
                this.maxHeight = this.childHeight - this.parentHeight + (borderTopWidth + borderBottomWidth + paddingTop + paddingBottom);
            },
            onWheel(e) { //滑动的时候
                //e.deltaY > 0 向下
                if (e.deltaY > 20) {
                    this.contentY -= 20 * 3;
                } else if (e.deltaY < -20) {
                    this.contentY -= -20 * 3;
                } else {
                    this.contentY -= e.deltaY * 3;
                }
                if (this.contentY > 0) {
                    this.contentY = 0
                } else if (this.contentY < -this.maxHeight) {
                    this.contentY = -this.maxHeight
                } else {
                    e.preventDefault()
                }
                this.updateScrollBar(this.parentHeight, this.childHeight);
            },
            updateScrollBar() { //计算bar的高度和位置
                //计算bar的高度
                // barHeight/parentHeight = parentHeight/childHeight    计算barHeight的重要公式
                // barHeight = parentHeight* parentHeight / childHeight
                this.barHeight = this.parentHeight * this.parentHeight / this.childHeight;
                this.$refs.bar.style.height = this.barHeight + 'px';
                //计算滚动时下降高度
                // y / parentHeight = Y / childHeight
                // y 是要计算的滚动条下降高度 Y 是translateY 即内容下降高度
                // 原理为 滚动条下降高度/窗口高度 = 内容下降高度/内容高度
                let y = this.parentHeight * this.contentY / this.childHeight;
                this.$refs.bar.style.transform = `translateY(${-y}px)`;
                this.scrollY = -y
            },
            onMouseEnter() { //鼠标进入窗口
                this.scrollBarVisible = true
            },
            onMouseLeave() { //鼠标移出窗口
                // this.scrollBarVisible = false;
                this.isScrolling = false; //鼠标移除停止滑动
            },
            onMouseDownScrollBar(e) { //鼠标按住滑块
                let {screenX, screenY} = e;
                this.startPosition = {x: screenX, y: screenY};
                this.isScrolling = true
                console.log('down');
            },
            onMouseMoveScrollBar(e) { //鼠标移动滑块
                if (!this.isScrolling) {
                    return
                }
                let {screenX, screenY} = e;
                console.log(screenX, screenY);
                this.endPosition = {x: screenX, y: screenY};
                let delta = {
                    x: this.endPosition.x - this.startPosition.x,
                    y: this.endPosition.y - this.startPosition.y
                };
                this.scrollX = this.scrollX + delta.x;
                this.scrollY = this.scrollY + delta.y;
                let maxHeight = this.parentHeight - this.barHeight
                if (this.scrollY >= maxHeight) {
                    this.scrollY = maxHeight
                } else if (this.scrollY < 0) {
                    this.scrollY = 0
                }
                this.contentY = -(this.childHeight * this.scrollY / this.parentHeight)
                this.startPosition = this.endPosition;
                this.$refs.bar.style.transform = `translate(0px , ${this.scrollY}px)`;
                console.log('move');
            },
            onMouseUpScrollBar() { //鼠标松开滑块
                this.isScrolling = false
            },
            onSelectScrollBar(e) { //鼠标选择滑块
                e.preventDefault()
            }

        }
    }
</script>

<style scoped lang="less">
    .gulu-scroll {
        /*border: 10px solid green;*/
        transition: transform 0.05s ease;
        &-wrapper {
            border: 1px solid red;
            overflow: hidden;
            position: relative;
        }
        &-track {
            position: absolute;
            height: 100%;
            right: 0;
            top: 0;
            width: 14px;
            background-color: #FAFAFA;
            border-left: 1px solid #E8E7E8;
            opacity: 0.9;
        }
        &-bar {
            position: absolute;
            top: -1px;
            left: 50%;
            margin-left: -4px;
            height: 40px;
            width: 8px;
            padding: 4px 0;
            &-inner {
                height: 100%;
                border-radius: 4px;
                background-color: #C2C2C2;
                &:hover {
                    background-color: #7D7D7D;
                }
            }
        }

    }
</style>