const multer=require('multer')
const path=require('path')

// const url = require("../../public/shopImg")
// 路由首先访问这 而不是访问 路由配置
const storage = multer.diskStorage({
    // 放置的文件夹
    destination: function (req, file, cb) {
    let url = path.resolve(__dirname,"../../public/shopImg")
        cb(null,url)
    },
    // 文件名设置
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  module.exports = multer({ storage: storage }).any()