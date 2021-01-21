/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
  * 获取关注该用户的用户列表,即粉丝
  * @param {number} followerId 被关注人的id
  */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId
                }
            }
        ]
    })
    // 格式化
    let userList = result.rows.map( row => row.dataValues )
    userList = formatUser(userList)
    return {
        count: result.count,
        userList
    }
}

/**
 * 添加关注关系
 * @param {number} userId 当前用户id
 * @param {number} followerId 被关注的id
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues
}

/**
 * 取消关注
 * @param {number} userId 用户id
 * @param {number} followerId 关注id
 */
async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower
}