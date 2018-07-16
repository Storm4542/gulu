<template>

       <button class="g-button">按钮</button>

</template>

<script>
    export default {
        name: "button"
    }
</script>

<style lang="scss">
    .g-button{
        font-size: var(--font-size);
        height: var(--button-height);
        background: var(--button-bg);
        padding: 0 1em;
        border-radius: var(--border-radius);
        border: 1px solid var(--border-color);
        color: var(--color);
        &:hover{
            border-color: var(--border-hover-bg);
        }

        &:active{
            background: var(--button-active-bg);
        }
        &:focus{
            outline: none;
        }
    }


</style>