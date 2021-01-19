/**
 * @description 时间格式工具
 */

const { format } = require('date-fns')

/**
 * 时间转换 如 01.19 11:42
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
    timeFormat
}