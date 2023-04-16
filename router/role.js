const express = require('express')
const { addRole, getRoles,getRolesFromPage,deleteOneRole, setRolePower, getRoleName} = require('../module/manage/handleRole')
const router = express.Router()
// 添加角色
router.post("/addRole", async (req,res)=>{
    let result  = await addRole(req.body,req.session.Root)
    res.send(result)
})
// 获取角色列表

router.get("/getRoles", async (req,res)=>{
    let result  = await getRoles()
    res.send(result)
})
// 获取角色分页数据
router.get("/getRolesFromPage", async (req,res)=>{
    let result = await getRolesFromPage(req.query)
    res.send(result)
})

// 删除一个角色
router.post("/deleteOneRole",async (req,res)=>{
    let result = await deleteOneRole(req.body)
    res.send(result)
})

// 修改角色
router.post("/setRolePower",async (req,res)=>{

    let result =await setRolePower(req.body)
    res.send(result) 
    
})

// 获取角色 
router.get("/getRoleName",async (req,res)=>{

    let result = await getRoleName()
    res.send(result)

})

module.exports = router