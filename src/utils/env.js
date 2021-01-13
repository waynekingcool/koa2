/**
 * @description 环境变量(线上线下)
 * @author king
 */

 const ENV = process.env.NODE_ENV

 module.exports = {
     isDev: ENV === 'dev',
     notDev: ENV !== 'dev',
     isProd: ENV === 'production',
     notProd: ENV !== 'production'
 }