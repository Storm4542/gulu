<template>
  <div class="slides" @mouseenter='onMouseEnter' @mouseleave='onMouseLeave'>
    <div class="slides-wrapper">
      <div class="slides-window">
        <slot/>
      </div>
    </div>
    <div class="slides-dots">
      <span v-for="(child,index) in $children" @click="select(index)" :class="{active:selectedIndex === index}">
        {{index+1}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'g-slides',
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
      lastSelected: undefined,
      timerId: undefined
    }
  },
  mounted() {
    this.updateChildren()
    this.autoPlay && this.playAutomatically()
  },
  updated() {
    this.updateChildren()
  },
  computed: {
    selectedIndex() {
      return this.getNames().indexOf(this.getSelected())
    }
  },
  methods: {
    onMouseEnter() {
      this.pausePlay()
      this.timerId = undefined //把timer放空
    },
    onMouseLeave() {
      this.playAutomatically()
    },
    select(index) {
      this.lastSelected = this.selectedIndex
      this.$emit('update:selected', this.getNames()[index])
    },
    getNames() {
      return this.$children.map(vm => vm.name) //收集所有的name
    },
    getSelected() {
      return this.selected || this.$children[0].name //获取当前 selected
    },
    updateChildren() {
      let selected = this.getSelected()
      this.$children.forEach(vm => {
        const names = this.getNames()
        let reverse = this.selectedIndex < this.lastSelected ? true : false //判断是从左到右，还是从右到左滑动
        //边界情况判断,在自动播放的时候是无缝的
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
        let currentNameIndex = names.indexOf(this.getSelected()) //获取当前name在names中的位置,当前index
        if (this.reversePlay) {
          currentNameIndex--
          if (currentNameIndex <= 0) {
            currentNameIndex = names.length
          }
        } else {
          currentNameIndex++
          if (currentNameIndex >= names.length) {
            currentNameIndex = 0
          }
        }
        this.select(currentNameIndex) //告诉外界选择了该index
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

