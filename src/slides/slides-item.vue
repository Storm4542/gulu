<template>
  <transition name='slide'>
    <div class="slides-item" v-if='visible' :class='{reverse}'>
      <slot/>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'g-slides-item',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      selected: undefined,
      reverse: false
    }
  }
}
</script>

<style lang="less" scoped>
.slides-item {
  width: 100%;
}
.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter {
  transform: translateX(100%);
}
.slide-enter.reverse {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-leave-to.reverse {
  transform: translateX(100%);
}
</style>

