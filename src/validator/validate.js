/**
 * @description 校验工具 npm install ajv --save
 */

const Ajv = require('ajv')
const ajv = new Ajv()

/**
 * json schema 校验
 * @param {Object} schema  json校验规则
 * @param {Object} data  待校验的数据
 */
function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data)
    if (!valid) {
        return ajv.errors[0]
    }
}

module.exports = validate