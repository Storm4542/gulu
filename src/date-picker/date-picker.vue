<template>
    <div ref="wrapper" style="border: 1px solid red;">
        <g-popover position="bottom" :container="wrapper">
            <g-input :value="formattedValue" type="text"/>
            <template slot="content">
                <div class="g-date-picker-pop" @selectstart.prevent>
                    <div class="g-date-picker-nav">
                        <span @click="preYear" :class="c('preYear','navItem')"> <g-icon
                                iconname="leftleft"></g-icon></span>
                        <span @click="preMonth" :class="c('preMonth','navItem')"><g-icon
                                iconname="left"></g-icon></span>
                        <span @click="onClickMonths" :class="c('yearAndMonth')">
                            <span>{{display.year}}年</span>
                            <span>{{display.month+1}}月</span>
                        </span>
                        <span @click="nextMonth" :class="c('nextMonth','navItem')"> <g-icon
                                iconname='right'></g-icon></span>
                        <span @click="nextYear" :class="c('nextYear','navItem')"><g-icon iconname='rightright'></g-icon></span>
                    </div>
                    <div class="g-date-picker-panels">
                        <template v-if="mode === 'months'">
                            <div :class="c('selectMonth')">
                                <label>
                                    <select @change="onSelectYear" :value="display.year">
                                        <option v-for="year in years" :value="year">{{year}}</option>
                                    </select>年
                                </label>
                                <label>
                                    <select @change="onSelectMonth" :value="display.month">
                                        <option value="0">1</option>
                                        <option value="1">2</option>
                                        <option value="2">3</option>
                                        <option value="3">4</option>
                                        <option value="4">5</option>
                                        <option value="5">6</option>
                                        <option value="6">7</option>
                                        <option value="7">8</option>
                                        <option value="8">9</option>
                                        <option value="9">10</option>
                                        <option value="10">11</option>
                                        <option value="11">12</option>
                                    </select>月
                                </label>
                            </div>
                        </template>
                        <template v-else>
                            <div :class="c('weekdays')">
                                <span :class="c('weekday')" v-for="n in [1,2,3,4,5,6,0]" :key="n">
                                    {{weekdays[n]}}
                                </span>
                            </div>
                            <!--6个 DIV 代表 6 行（6周） -->
                            <div :class="c('row')" v-for="i in helper.range(1,6)" :key="i">
                                <!--7个span 代表 7列（7天）-->
                                <span @click="onClickCell(getVisibleDay(i,j))"
                                      :class="[c('cell'),{currentMonth:isCurrentMonth(getVisibleDay(i,j))}]"
                                      v-for="j in helper.range(1,7)" :key="j">
                                    <!--二元数组-->
                                 {{getVisibleDay(i,j).getDate()}}
                             </span>
                            </div>
                        </template>
                    </div>
                    <div class="g-picker-actions">
                        <button>清除</button>
                    </div>
                </div>
            </template>
        </g-popover>


    </div>
</template>

<script>
    import GInput from '../input'
    import GIcon from '../icon'
    import GPopover from '../popover'
    import ClickOutside from '../click-outside'
    import helper from './helper'


    export default {
        name: "g-date-picker",
        components: {GInput, GIcon, GPopover},
        directives: {ClickOutside},
        props: {
            firstDayOfWeek: {
                type: Number,
                default: 1
            },
            value: {
                type: Date,
                default: () => new Date()
            },
            scope: {
                type: Array,//[start,end]
                default: () => [helper.addYear(new Date(), -20), helper.addYear(new Date(), 20)] //默认20年前，20年后
            }
        },
        mounted() {
            this.wrapper = this.$refs.wrapper
        },
        data() {
            let [year, month] = helper.getYearMonthDate(this.value)
            return {
                mode: 'days', // | 'months' | 'days'
                helper: helper,
                weekdays: ['日', '一', '二', '三', '四', '五', '六'],
                wrapper: null,
                display: {year, month}
            }
        },
        computed: {
            visibleDays() {
                let date = new Date(this.display.year, this.display.month, 1);
                let firstDay = helper.firstDayOfMonth(date);
                //计算
                let weekDayOfFirst = firstDay.getDay() || 7; // 一号是周几
                //计算 日历表上的第一天是哪一天
                let x = firstDay - (weekDayOfFirst - 1) * 3600 * 24 * 1000;
                let array = [];
                //根据第一天，生成总共的42天
                for (let i = 0; i < 42; i++) {
                    array.push(new Date(x + i * 3600 * 24 * 1000))
                }
                return array
            },
            formattedValue() {
                const [year, month, day] = this.helper.getYearMonthDate(this.value)
                return `${year}年${month + 1}月${day}日`
            },
            years() {
                return helper.range(this.scope[0].getFullYear(), this.scope[1].getFullYear())
            }

        },
        methods: {
            c(...classNames) {
                return classNames.map(className => `g-date-picker-${className}`)
            },
            onClickMonths() {
                if (this.mode !== 'months') {
                    this.mode = 'months'
                } else {
                    this.mode = 'days'
                }
            },
            getVisibleDay(row, col) {
                return this.visibleDays[(row - 1) * 7 + col - 1]
            },
            onClickCell(date) {
                if (this.isCurrentMonth(date)) {
                    this.$emit('updateDay', date)
                }
            },
            isCurrentMonth(day) {
                const [year1, month1] = this.helper.getYearMonthDate(day)
                const [year2, month2] = this.helper.getYearMonthDate(new Date(this.display.year, this.display.month, 1))
                return year1 === year2 && month1 === month2
            },
            preYear() {
                const oldDate = new Date(this.display.year, this.display.month, 1);
                const newDate = helper.addYear(oldDate, -1)
                const [year, month] = helper.getYearMonthDate(newDate)
                this.display = {year, month}
            },
            preMonth() {
                const oldDate = new Date(this.display.year, this.display.month, 1);
                const newDate = helper.addMonth(oldDate, -1)
                const [year, month] = helper.getYearMonthDate(newDate)
                this.display = {year, month}

            },
            nextYear() {
                const oldDate = new Date(this.display.year, this.display.month, 1);
                const newDate = helper.addYear(oldDate, 1)
                const [year, month] = helper.getYearMonthDate(newDate)
                this.display = {year, month}
            },
            nextMonth() {
                const oldDate = new Date(this.display.year, this.display.month, 1);
                const newDate = helper.addMonth(oldDate, 1)
                const [year, month] = helper.getYearMonthDate(newDate)
                this.display = {year, month}
            },
            onSelectYear(e) {
                const year = parseInt(e.target.value)
                const d = new Date(year, this.display.month)
                if (d >= this.scope[0] && d <= this.scope[1]) {
                    this.display.year = parseInt(e.target.value)
                } else {
                    e.target.value = this.display.year
                    alert('no')
                }
            },
            onSelectMonth(e) {
                const month = parseInt(e.target.value)
                const d = new Date(this.display.year, month)
                if (d >= this.scope[0] && d <= this.scope[1]) {
                    this.display.month = parseInt(e.target.value)
                } else {
                    e.target.value = this.display.month
                    alert('no')
                }

            }
        }
    }
</script>

<style lang="less" scoped>
    .g-date-picker {
        &-nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        &-pop-wrapper {
            padding: 0;
        }
        &-cell {
            color: #ddd;
            &.currentMonth {
                color: black;
            }
        }
        &-yearAndMonth {
            width: 96px;
            text-align: center;
        }
        &-selectMonth {
            width: 224px;
            height: 224px;
            display: flex;
            justify-content: center;
            align-items: center;

        }
        &-navItem, &-cell, &-weekday {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            width: 32px;
        }

    }

    /deep/ .popover-content-wrapper {
        padding: 0;
    }


</style>