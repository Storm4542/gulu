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
        computed: {
            maxScrollHeight() {
                return this.parentHeight - this.barHeight
            }
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
                //获取contentY 初始值
                this.contentY = this.calculateContentYFromDeltaY(e.deltaY);
                //更新 contentY
                this.updateContentY(() => e.preventDefault()); // 传入 fn
                //更新 scrollY
                this.updateScrollBar(this.parentHeight, this.childHeight);
            },
            calculateContentYFromDeltaY(deltaY) {
                let contentY = this.contentY;
                if (deltaY > 20) {
                    contentY -= 20 * 3;
                } else if (deltaY < -20) {
                    contentY -= -20 * 3;
                } else {
                    contentY -= deltaY * 3;
                }
                return contentY;

            },
            updateContentY(fn) {
                if (this.contentY > 0) {
                    this.contentY = 0
                } else if (this.contentY < -this.maxHeight) {
                    this.contentY = -this.maxHeight
                } else {
                    fn && fn()
                }
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
                this.scrollY = -this.parentHeight * this.contentY / this.childHeight;
                this.$refs.bar.style.transform = `translateY(${this.scrollY}px)`;
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
                this.endPosition = {x: e.screenX, y: e.screenY};
                let delta = {
                    x: this.endPosition.x - this.startPosition.x,
                    y: this.endPosition.y - this.startPosition.y
                };
                // this.scrollX = this.scrollX + delta.x;
                // 更新 scrollY
                this.calculateScrollY(delta);
                this.contentY = -(this.childHeight * this.scrollY / this.parentHeight)
                this.startPosition = this.endPosition;
                this.$refs.bar.style.transform = `translate(0px , ${this.scrollY}px)`;
                console.log('move');
            },
            calculateScrollY(delta) {
                this.scrollY = this.scrollY + delta.y;
                if (this.scrollY >= this.maxScrollHeight) {
                    this.scrollY = this.maxScrollHeight
                } else if (this.scrollY < 0) {
                    this.scrollY = 0
                }
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