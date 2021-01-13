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