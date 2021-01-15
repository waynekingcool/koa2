/**
 * @description 用户路由,只负责参数的获取和路由的派发
 */

const router = require('koa-router')()
const { isExist, register } = require('../../controller/user')

// 加前缀
router.prefix('/api/user')

// 注册路由
router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})


module.exports = router