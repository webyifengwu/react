const mongoLogin = require("../../mongodb/mongoLogin");

const addUser = async ({username,password,phone,role})=>{
const bol  =  await mongoLogin.findOne({username})
    if(bol){
        return {code:0,value:"用户名重复",data:{}}
    }else{
        let result =await mongoLogin.create({
            username,
            password,
            time:Date.now(),
            phone:phone,
            loginAbout:role,
            key:Date.now()+""
        })
        return {
            code:1,value:`${username} 用户创建成功！`,data:{result}
        }
    }
}
// 获取用户数据
const getUsers = async ()=>{
    let result =  await mongoLogin.find().populate("loginAbout",{roleName:1})
    let len = result.length
    let tenData = result.splice(0,10)
    return {
        code:1,value:"获取用户数据成功！",data:{
            len,tenData
        }
    }
}
// 删除用户
const deleteUser = async ({_id})=>{
    let result = await mongoLogin.deleteOne({_id})
    return {
        code:1,value:"删除用户成功",data:result
    }
}
// 修改用户信息
const changeUser = async ({username,password,phone,role,_id})=>{
    const bol = mongoLogin.find({_id:{$ne:_id},username})
    if(!bol.length){//用户名没重复
        const result = await mongoLogin.updateOne({_id},{username,password,phone,time:Date.now(),loginAbout:role})
        return {
            code:1,value:"用户信息修改成功！",data:{}
        }
    }else{
        return {
            code:0,value:"用户名重复",data:{}
        }
    }
}
module.exports = {
    addUser,getUsers,deleteUser,changeUser
}