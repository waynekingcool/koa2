/**
 * @description 用户关系
 */

const { getUsersByFollower, addFollower, deleteFollower, getFollowersByUser } = require('../services/user-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')

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

/**
 * 获取关注人列表
 * @param {number} userId 当前登录的id
 */
async function getFollowers(userId) {
    const { count, userList } = await getFollowersByUser(userId)
    return new SuccessModel({
        count,
        followersList: userList
    })
}

/**
 * 关注
 * @param {number} myUserId 当前登录的id
 * @param {number} curUserId 要被关注的id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (error) {
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的id
 * @param {number} curUserId 取消关注的id
 */
async function unFollow(myUserId, curUserId) {
    try {
        await deleteFollower(myUserId, curUserId)
        return new SuccessModel()
    } catch (error) {
        return new ErrorModel(deleteFollowerFailInfo)
    }
}

module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}