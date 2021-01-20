/**
 * @description 用户关系表
 */

const seq = require('../seq')
const { TEXT, STRING, INTEGER } = require('../type')

const UserRelation = seq.define('userRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户ID'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的id'
    }
})

module.exports = UserRelation