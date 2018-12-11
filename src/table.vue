<template>
    <div class="tableWrapper">
        <table class="table" :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th><input @change="onChangeAllItems" type="checkbox" ref="AllCheck"></th>
                <th v-if="numberVisible">#</th>
                <th v-for="(column,index) in columns" :key="column.field"> {{column.text}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(data,index) in dataSource" :key="data.id">
                <td>
                    <input type="checkbox"
                           @change="onChangeItem(data,$event)"
                           :checked="isChecked(data)"/>
                </td>
                <td v-if="numberVisible">{{index+1}}</td>
                <template v-for="column in columns">
                    <td :key="column.field">{{data[column.field]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "g-table",
        props: {
            columns: {
                required: true,
                type: Array,
            },
            dataSource: {
                required: true,
                type: Array,
                validator: (array) => {
                    return array.filter(item => item.id === undefined).length <= 0;
                }
            },
            selectedItems: {
                type: Array,
                default: () => []
            },
            numberVisible: {
                type: Boolean,
                default: false
            },
            bordered: {
                type: Boolean,
                default: false
            },
            compact: {  //是否为紧凑型
                type: Boolean,
                default: false
            },
            striped: {  //条纹
                type: Boolean,
                default: false
            }
        },
        watch: {
            selectedItems() { //checkBox 半选逻辑 indeterminate 全选逻辑 checked
                this.$refs.AllCheck.indeterminate = this.selectedItems.length < this.dataSource.length && this.selectedItems.length !== 0;
                this.$refs.AllCheck.checked = this.selectedItems.length === this.dataSource.length
            }
        },
        methods: {
            isChecked(data) {
                return this.selectedItems.filter((i) => i.id === data.id).length > 0
            },
            onChangeItem(data, e) {
                let selected = e.target.checked;
                let copy = JSON.parse(JSON.stringify(this.selectedItems));
                if (selected) {
                    copy.push(data)
                } else {
                    copy = copy.filter((item) => item.id !== data.id);
                }
                this.$emit('update:selectedItems', copy)
            },
            onChangeAllItems(e) {
                let selected = e.target.checked;
                this.$emit('update:selectedItems', selected ? this.dataSource : [])
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "_var";

    .table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border-bottom: 1px solid darken(@grey, 20%);
        th, td {
            text-align: left;
            border-bottom: 1px solid darken(@grey, 20%);
            padding: 8px;
        }

    }

    .bordered {
        border: 1px solid darken(@grey, 20%);
        td, th {
            border: 1px solid darken(@grey, 20%);
        }
    }

    .compact {
        td, th {
            padding: 4px;
        }
    }

    .striped {
        tbody {
            > tr {
                &:nth-child(odd) {
                    background-color: white;
                }
                &:nth-child(even) {
                    background-color: lighten(@grey, 5%);
                }
            }
        }
    }
</style>