/**
 * @description 数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

Blog.belongsTo(User, {
   foreignKey: 'userId'
})

// UserRelation属于 User
UserRelation.belongsTo(User, {
   foreignKey: 'followerId'
})

// User有多个UserRelation
User.hasMany(UserRelation, {
   foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {
   foreignKey: 'userId',
   targetKey: 'followerId'
})

module.exports = {
   User,
   Blog,
   UserRelation
}