const mongoLogin = require("../../mongodb/mongoLogin")
 const  setLogin= async ({username,password})=> {
    // 检验是否存在该用户
    let bol = await mongoLogin.findOne({username}).populate("loginAbout")

    if(!bol){
        return {code:0,value:"账号不存在",data:{}}
    }
    if(bol.password !== password){
        return {code:0,value:"密码错误",data:{}}
    }
    bol.password = ""
    return {code:1,value:"登录成功",data:bol}

}   


module.exports = {
    setLogin
}
