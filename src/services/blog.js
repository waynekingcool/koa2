/**
 * @description 微博service
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需要的数据
 */
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

/**
 * 根据用户获取列表
 * @param {Object} param0 查询参数
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
    // 拼接查询条件
    const userWhereOps = {}
    if (userName) {
        userWhereOps.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'nickName', 'picture'],
                where: userWhereOps
            }
        ]
    })

    // result.count 总数,跟分页无关
    // result.rows 查询结果,数组
    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map( item => {
        const user = item.user.dataValues
        item.user = formatUser(user)
        return item
    })

    return {
        count: result.count,
        blogList
    }
}

module.exports = {
    createBlog,
    getBlogListByUser
}