/**
 * @description sequelize实例
 */

const Sequelize = require('sequelize')
const { isProd } = require('../utils/env')

const { MYSQL_CONF } = require('../conf/db')

const { host, user, password, port, database } = MYSQL_CONF
const conf = {
    host,
    dialect: 'mysql'
        // pool: {
    //     // 连接池最大连接数
    //     max: 5,
    //     // 连接池最小连接数
    //     min: 0,
    //     // 如果1个连接池10秒未使用,则释放
    //     idle: 100000
    // }
}

if (isProd) {
    // 如果是生产环境则关闭打印sql语句
    conf.logging = () => {}
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq