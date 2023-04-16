const mongoose=require('mongoose')
const mongoLogin = require('./mongoLogin')

let schema = new mongoose.Schema({
    accountName:String,
    accountTime:Date,
    // 表关联
    accountAbout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:mongoLogin
    },
    key:Number,
})

module.exports = mongoose.model("Account",schema)
