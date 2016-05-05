### Node REST API

使用Node实现REST API接口，可以提供給App或者第三方应用调用，实现应用程序分层解耦。

- Node

- Express

- ES2015

- Sequelize

- Babel

- Passport


### 运行

前提需要本地创建数据库，提供数据源。

    $ npm install
    $ nodemon --exec babel-node app.js


### 查看文档

    http://localhost:3000/apidoc

或者因为本地没有数据库，那么可以先安装httpster

    $ npm install httpster -g
    $ httpster

然后访问

    http://localhost:3333/public/apidoc

即可访问API文档说明