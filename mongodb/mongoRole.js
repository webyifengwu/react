const mongoose = require('mongoose')

const schema = mongoose.Schema({
    roleName: String,    //名称
    roleTime: Date,      //创建时间
    creator: String,   //授权人
    rolePower: { //存储权限
        type: Array,
        default: []
    },roleShowPower: { //可显现权限
        type: Array,
        default: []
    },key:Number


})

module.exports = mongoose.model("roles", schema)