/**
 * @description sequelize同步
 */

const seq = require('./seq')

// require('./model')

// 测试连接
seq.authenticate().then(() => {
    console.log('连接数据库成功....');
}).catch(() => {
    console.log('err');
})

// 执行同步 true的话则强制覆盖掉已有table
seq.sync({ force: true}).then(() => {
    console.log('同步已完成')
    process.exit()
})