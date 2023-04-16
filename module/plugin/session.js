const session=require('express-session')
const MongoStore=require('connect-mongo')
module.exports=session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,//安全协议下使用
        maxAge:1000*60*60*24*3
    },
    store:MongoStore.create({mongoUrl:'mongodb://localhost:27017/Management'})
})
