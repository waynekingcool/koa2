/**
 * @description 首页controller
 */

const xss = require('xss')
const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel} = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
  * 创建微博
  * @param {Object} param0  微博所需要的参数
  */
async function create({ userId, content, image}) {
    try {
        // 创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })
        return new SuccessModel(blog)
    } catch (error) {
        console.error(ex.message, ex.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

module.exports = {
    create
}