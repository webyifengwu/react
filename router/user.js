const { query } = require('express')
const express=require('express')
const { addUser, getUsers, deleteUser, changeUser } = require('../module/manage/handleUser')

const router = express.Router()
router.post("/addUser",async (req,res)=>{
    let data = await addUser(req.body)
    res.send(data)
})
// 获取用户数据
router.get("/getUsers",async (req,res)=>{
    let result  =  await getUsers()
    res.send(result)
})

// 删除
router.post("/deleteUser",async (req,res)=>{
    let result  = await deleteUser(req.body)
    res.send(result)
})
// 修改
router.post("/changeUser", async (req,res)=>{
    let result = await changeUser(req.body)
    res.send(result)
})
module.exports = router