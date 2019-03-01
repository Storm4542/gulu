<template>
    <div class="warpper">
        <input :value="value"
               :disabled="disabled"
               :readonly="readonly"
               :class="{'error':error}"
               @change="$emit('change', $event.target.value)"
               @input="$emit('input', $event.target.value)"
               @focus="$emit('focus', $event.target.value)"
               @blur="$emit('blur', $event.target.value)"
               type="text">
        <template v-if="error">
            <g-icon iconname="error" class="icon-error"></g-icon>
            <span v-if="error" class="error-message">{{error}}</span>
        </template>
    </div>
</template>

<script>
    import Icon from './icon'

    export default {
        name: "g-input",
        components: {
            'g-icon': Icon
        },
        props: {
            value: {
                type: [String,Date]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error: {
                type: String
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../styles/_var";

    .warpper {
        display: inline-flex;
        align-items: center;
    }

    .warpper {
        font-size: @font-size;
        > *:not(:last-child) {
            margin-right: .5em
        }
        > input {
            height: @height;
            border: 1px solid @border-color;
            border-radius: @border-radius;
            padding: 0 8px;
            font-size: inherit;
            outline: none;
            &:hover {
                border-color: @border-color-hover;
            }
            &:focus {
                box-shadow: inset 0 1px 3px @box-shadow-color;
            }
            &[disabled], &[readonly] {
                border-color: #aaa;
                color: #666;
                cursor: not-allowed;
            }
            &.error {
                border-color: @border-color-error;
            }
        }
        > .icon-error {
            fill: @border-color-error;
        }
        > .error-message {
            color: @border-color-error;
        }
    }
</style>