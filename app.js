const express=require('express')
const app = express()

const history = require('connect-history-api-fallback');


// 中间件
app.use(require("./module/plugin/cors"))
app.use(require("./module/plugin/session"))
app.use(require("./module/plugin/multer"),)
app.use(history())
//静态文件夹 

app.use(express.static("./public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//连接数据库

//配置子路由

app.use("/login",require("./router/login"))
app.use("/goods",require("./router/goods"))
app.use("/role",require("./router/role"))
app.use("/user",require("./router/user"))
require("./mongodb/mongoose")

app.listen(8080,()=>{
    console.log('8080端口已打开');
})