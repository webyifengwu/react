const express=require('express')
const {setLogin} = require("../module/manage/handleLogin")
const router = express.Router();

//登录
router.get('/submit',async (req,res)=>{
    let result = await setLogin(req.query)
    if(result.code){
       req.session.Root = result
   }
    res.send(result)
   })
   
//免登录路由
router.get('/avoidLand',(req,res)=>{
if(req.session.Root){
    res.send({code:1,value:"登陆成功！",data:req.session.Root})
}else{
    res.send({code:0,value:"请先登录后再查看！",data:{}})
}
})

//删除免登录的session
// removeexit
router.post("/removeexit",(req,res)=>{
    req.session.Root =""
    // console.log(req.session);
    res.send({code:1,value:"退出登录成功！",data:{}})
})



module.exports = router
