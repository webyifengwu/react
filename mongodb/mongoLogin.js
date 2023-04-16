const mongoose=require('mongoose')
const mongoRole = require('./mongoRole')
//创建 登录数据库 表规则
let schema = mongoose.Schema({
    username:String,
    password:String,
    time:Date,
    phone:String,
    loginAbout:{    //关联值 
        type:mongoose.Types.ObjectId,
        ref:mongoRole
    },
    key:Number
})

module.exports = mongoose.model("Users",schema)