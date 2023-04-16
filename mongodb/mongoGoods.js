const mongoose=require('mongoose')
const mongoLogin = require('./mongoLogin')

let schema = new mongoose.Schema({
    goodsKind:String,
    goodsName:String,
    goodsDescription:String,
    goodsPrice:Number,
    goodsPicture:Array,
    goodsTime:Date,
    goodsAbout:{
        type:mongoose.Schema.Types.ObjectId,
        ref:mongoLogin
    },
    key:Number
}) 

module.exports = mongoose.model("goods",schema)