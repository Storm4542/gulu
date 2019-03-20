<template>
    <div>
        <g-popover position="top" trigger="hover">
            <template slot="content">
                popover内容
            </template>
            <g-button btntype="success">top</g-button>
        </g-popover>
        <g-popover position="bottom" trigger="hover">
            <template slot="content">
                popover内容
            </template>
            <g-button btntype="success">bottom</g-button>
        </g-popover>
        <g-popover position="left" trigger="hover">
            <template slot="content">
                popover内容
            </template>
            <g-button btntype="success">left</g-button>
        </g-popover>
        <g-popover position="right" trigger="hover">
            <template slot="content">
                popover内容
            </template>
            <g-button btntype="success">right</g-button>
        </g-popover>
    </div>
</template>

<script>
    import Popover from './src/popover';
    import Button from './src/button/button';

    export default {
        name: "popover-demos",
        components: {
            'g-popover': Popover,
            'g-button': Button
        }
    };
</script>
<style lang='less' scoped>
    @import "styles/_var";
</style>