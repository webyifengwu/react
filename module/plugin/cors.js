// const cors=require('cors')
// // let arr =["http://192.168.226.1:3000","http://localhost:3000"]
// module.exports = cors({
//     // origin:(origin,callback)=>{
//     //     if(arr.indexOf(origin) !== -1){
//     //         callback(null,true)
//     //     }else{
//     //         callback(new Error('Not allow by CORS'))
//     //     }
//     // },//运行访问的地址
//     origin:"http://localhost:3000",
//     credentials:true //可以传递 请求头数据
// })
const cors = require("cors");


module.exports = cors({
    origin:"http://localhost:3000",  // 运行访问的地址
    credentials:true    // 可以传递 请求头数据
})