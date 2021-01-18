环境配置:
1. koa2 -e koa2-weibo-code (-e表示使用了ejs模板).
2. 进入项目npm install 安装依赖, npm run dev开启服务.
3. 安装环境变量工具: npm install cross-env --save,然后在package.json中添加开发环境
4.将public routes views app.js移到src文件夹中,并且在www.js文件修改app引入路径.


ORM:
1.npm install mysql2 --save
2.npm install sequelize --save 

Redis:
1.npm install redis --save
2.npm install koa-redis --save   连接reids工具
3.npm install koa-generic-session --save   生成session工具

jest(单元测试):
1.npm install jest --save-dev

jwt:
1.npm install koa-jwt --save
2.在app.js中引入
    const jwt = require('koa-jwt')
    app.use(jwt({
        secret: 'wanbin'
    }).unless({
        path: [/^\/users\/login/]   //忽略那些路由需要jwt
    }))
3.安装加密工具 npm install jsonwebtoken --save.
4.在 *.js文件中引入
    const jwt = require('jsonwebtoken')
    // 需要加密的用户信息, 秘钥, 过期时间1小时
    let token = jwt.sign(userInfo, SECRET, { expiresIn: '1h' })
5.解密
    const util = require('util') 自带工具
    const verify = util.promisify(jwt.verify)  将callback转为promise
    const payload = await verify(token.split(' ')[1], SECRET)  解密后即为用户信息

图片上传:
1.npm install formidable-upload-koa --save,该包用于上传文件.
2.npm install fs-extra --save,该包为fs模块的扩展.