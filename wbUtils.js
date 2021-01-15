/**
 * 类型检测
 * @param {*} obj需要判断的对象
 */
function getType(obj) {
    let type = typeof obj;
    if (type !== "object") {
        return type
    }

    return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

module.exports = {
    getType
}