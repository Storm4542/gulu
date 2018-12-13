<template>
    <div class="tableWrapper">
        <table class="table" :class="{bordered,compact,striped}">
            <thead>
            <tr>
                <th><input @change="onChangeAllItems" type="checkbox" ref="AllCheck"></th>
                <th v-if="numberVisible">#</th>
                <th v-for="(column,index) in columns" :key="column.field">
                    <div class="header">
                        {{column.text}}
                        <span v-if="column.field in orderBy" class="sorter"
                              @click="changeOrderBy(column.field)">
                            <g-icon iconname="asc"
                                    :class="{active:orderBy[column.field]==='asc'}"
                            ></g-icon>
                            <g-icon iconname="desc"
                                    :class="{active:orderBy[column.field]==='desc'}"
                            ></g-icon>
                        </span>
                    </div>
                </th>
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
        <div v-if="loading" class="table-loading">
            <g-icon iconname="loading"></g-icon>
        </div>
    </div>
</template>

<script>
    import GIcon from './icon'

    export default {
        name: "g-table",
        components: {GIcon},
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
            orderBy: {
                type: Object,
                default: () => ({}),
            },
            selectedItems: {
                type: Array,
                default: () => []
            },
            numberVisible: {
                type: Boolean,
                default: false
            },
            loading: {
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
            changeOrderBy(key) {
                let copy = JSON.parse(JSON.stringify(this.orderBy));
                let oldValue = copy[key];
                if (oldValue === 'asc') {
                    copy[key] = 'desc'
                } else if (oldValue === 'desc') {
                    copy[key] = true
                } else {
                    copy[key] = 'asc'
                }
                this.$emit('update:orderBy', copy)
            },
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
        .header {
            display: flex;
            align-items: center;
            .sorter {
                display: inline-flex;
                flex-direction: column;
                margin: 0 4px;
                cursor: pointer;
                svg {
                    width: 10px;
                    height: 10px;
                    fill: @grey;
                    &.active {
                        fill: red;
                    }
                    &:first-child {
                        position: relative;
                        bottom: -1px;
                    }
                    &:nth-child(2) {
                        position: relative;
                        top: -1px;
                    }
                }
            }
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

    .tableWrapper {
        position: relative;

    }
    .table-loading {
        background-color: rgba(255, 255 ,255 ,0.8);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
            width: 50px;
            height: 50px;
            animation: spin 1.5s linear infinite;
        }

    }
</style>