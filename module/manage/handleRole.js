const mongoRole = require('../../mongodb/mongoRole')

// 添加角色
const addRole = async ({ roleName }, Root) => {
    let bol = await mongoRole.find({ roleName })
    if (bol.length) {
        return {
            code: 0, value: "角色名重复,不能添加", data: {}
        }
    } else {
        let result = await mongoRole.create({
            roleName: roleName,    //名称
            roleTime: Date.now() + "",      //创建时间
            creator: Root.data.username,   //授权人
            key: Date.now() + ""
        })
        return {
            code: 1, value: "角色添加成功!", data: { result }
        }
    }
}

// 获取角色列表
const getRoles = async () => {
    let result = await mongoRole.find({})
    let len = result.length
    let tenData = result.splice(0, 10)
    return {
        code: 1, value: "角色列表获取成功!", data: {
            len, tenData
        }
    }
}

// 分页
const getRolesFromPage = async ({ current, pageSize }) => {
    let num = current * pageSize - pageSize
    let result = await mongoRole.find({}, {}, { skip: num, limit: pageSize })
    return {
        code: 1, value: `第${current}页数据获取成功!`, data: result
    }
}
const deleteOneRole = async ({_id})=>{
    let result  = await mongoRole.deleteOne({_id})
    return{
        code:1,value:"删除角色成功！",data:result
    }
}
const setRolePower = async ({roleShowPower,rolePower,_id})=>{
    let result = await mongoRole.updateOne({_id},{rolePower,roleShowPower})
    return {
        code:1,value:"权限修改成功！",data:{}
    }
}

// 获取分类名 以及 id
const getRoleName =async ()=>{
    let result  = await mongoRole.find({},{roleName:1})
    result = result.map(item=>{
        let obj = {value:item._id}
        
        obj.value = item._id
        obj.label = item.roleName
        return obj
    })
    return {
        code:1,value:"角色名获取成功!",data:result
    }
}

module.exports = {
    addRole, getRoles, getRolesFromPage,deleteOneRole,setRolePower,getRoleName
}