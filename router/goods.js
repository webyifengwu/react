const express = require('express');
const {
    addGoodsAccount, getKinds, getKindsFromPage, postDeleteAccount, postUpdateAcount,
    getAllKindsName,addGoodsConclusion, removeOnePicture, removeSomePicture,
    getGoods,
    getGoodsFromPage,
    deleteOneGoods,changeGoods,getGoodsFromSearch,getGoodsFromPageAndSearch
} = require('../module/manage/handleGoods');
const router = express.Router()
const upload = require("../module/plugin/multer")
const multer=require('multer')
const baseUrl = "shopImg/"
// 分类名路由
//添加
router.post("/add", async (req, res) => {
    let result = await addGoodsAccount(req.body, req.session.Root)
    res.send(result)
})
//获取
router.get("/getAcount", async (req, res) => {
    let result = await getKinds()
    res.send(result)
})
//按页码拿数据
router.get("/getKindsFromPage", async (req, res) => {
    let result = await getKindsFromPage(req.query)
    res.send(result)
})
//修改分类名
router.post("/update", async (req, res) => {
    let result = await postUpdateAcount(req.body)
    res.send(result)
})
//删除分类名
router.post("/delete", async (req, res) => {
    let result = await postDeleteAccount(req.body);
    res.send(result)
})

// 商品的路由

// 添加商品页的路由
// 获取全部分类名
router.get('/getKinds', async (req,res) => {
    let result = await getAllKindsName()
    res.send(result)
})

// 商品图片处理 
router.post("/submit",(req, res)=>{
    // 这里会出现一点由于版本更新出现的问题 比如多了个 Error: Unexpected end of form
    upload(req, res,(err)=> {
      if (err instanceof multer.MulterError) {
        // 发生错误
       return res.send({code:0,value:"上传错误",data:{}})
      } else if (err) {
        // 发生错误
        return res.send({code:0,value:"未知错误",data:{}})
      }
      // 一切都好c
      return res.send({code:1,value:"上传成功",data:{}})
    })
    
  })
//   添加商品信息到数据库
router.post("/conclusion",async (req,res)=>{
     const result  = await addGoodsConclusion(req.body,req.session.Root)
    res.send(result)
})
// 删除一张图片
router.post("/removeOnePic",async (req,res)=>{    
  let result = await removeOnePicture({baseUrl,fileName:req.body.name})
    res.send(result)
})
// 删除多张图片
router.post("/removeSomePic",async (req,res)=>{
    let result = await removeSomePicture({baseUrl,fileNameArr:req.body})
    res.send(result)
})

// 商品展示页的路由
// 拿到初始数据
router.get("/getGoods",async (req,res)=>{
    let result = await getGoods();
    res.send(result)
})
// 按页码来拿数据
router.get("/getGoodsFromPage",async (req,res)=>{
    let result  = await getGoodsFromPage(req.query)
    res.send(result)
})
// 删除单个商品
router.post("/deleteOneGoods",async (req,res)=>{
    const result = await deleteOneGoods(req.body)
    res.send(result)
})
// 修改商品信息
router.post("/changeGoods",async (req,res)=>{
    let result = await changeGoods(req.body)
    res.send(result)
})

// 商品搜索
router.get("/getGoodsFromSearch",async (req,res)=>{
    let result = await getGoodsFromSearch(req.query)
    res.send(result)
})
router.get("/getGoodsFromPageAndSearch",async (req,res)=>{
    let result = await getGoodsFromPageAndSearch(req.query)
    res.send(result)
})

module.exports = router