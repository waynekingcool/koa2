/**
 * @description 用户关系
 */

const { getUsersByFollower } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

/**
  * 获取粉丝列表
  * @param {number} userId 用户id
  */
async function getFans(userId) {
    const { count, userList } = await getUsersByFollower(userId)

    return new SuccessModel({
        count,
        userList
    })
}

module.exports = {
    getFans
}