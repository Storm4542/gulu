export default {
    firstDayOfMonth(date) {
        return new Date(date.setDate(1));
    },
    lastDayOfMonth(date) {
        date.setDate(1);//解决1月31号 date.setmonth(1) 后变为 3月3日的BUG,因为setmonth(1)的原理是加上当月的天数，只要小与29号，就不会出现该BUG
        date.setMonth(date.getMonth() + 1); // 设置为下个月的第一天
        return new Date(date.setDate(0)); // 返回下个月第一天的前一天
    },
    range(begin, end) {
        let array = [];
        for (let i = begin; i <= end; i++) {
            array.push(i)
        }
        return array
    },
    addMonth(date, n) {
        const [_1, month, _2] = getYearMonthDate(date);
        const newMonth = month + n;
        const copy = new Date(date);
        copy.setMonth(newMonth);
        return copy
    },
    addYear(date,n){
        const [year] = getYearMonthDate(date);
        const newYear = year + n;
        const copy = new Date(date);
        copy.setFullYear(newYear);
        return copy
    },
    getYearMonthDate
}

function getYearMonthDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return [year, month, day]
}