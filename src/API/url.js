import createAxios from "./createAxios"

const url = 'http://localhost:8080/'
// const url = 'http://192.168.226.1:8080/'
//登录信息
const login = (data) =>createAxios('get',url+"login/submit",data)
//天气信息
const weather = ()=>createAxios("get",url+"login/weather");
// 创建并使用免登陆的session
const avoidLand = ()=>createAxios("get",url+"login/avoidLand");
// 删除免登录的session
const exitSession = ()=>createAxios('post',url+"login/removeexit")

//  商品类 api
// 添加分类
const addAcount = value =>createAxios("post",url+"goods/add",value);
// 获取分类的长度和前10条数据
const getAcount = ()=>createAxios("get",url+"goods/getAcount");
//获取num分页的数据
const getPageAcount = (value) => createAxios("get",url+"goods/getKindsFromPage",value)
// 修改分类名的数据
const changeKindName = (value)=>createAxios("post",url+"goods/update",value)
//删除分类名
const deleteKindName = (value)=>createAxios("post",url+"goods/delete",value)

// 商品api
//获取所有分类的数据
const getKinds = ()=>createAxios("get",url+"goods/getKinds")
// 商品图片地址
const uploadPicUrl = url+"goods/submit"
// 上传商品信息
const submitGoods = (value)=>createAxios("post",url+"goods/conclusion",value)
// 删除一张图片的操作
const removeOnePicture = (value)=>createAxios("post",url+"goods/removeOnePic",value)
const removeSomePicture = (value)=>createAxios("post",url+"goods/removeSomePic",value)

// 获取商品页初始数据
const getGoods = ()=>createAxios("get",url+"goods/getGoods")
// 获取商品页分页数据
const getGoodsFromPage =(value)=>createAxios("get",url+"goods/getGoodsFromPage",value)
// 删除单个商品
const  deleteGoods =(value)=>createAxios("post",url+"goods/deleteOneGoods",value)
// 修改商品信息
const changeGoods = (value)=>createAxios("post",url+"goods/changeGoods",value)

// 商品搜索功能
const getGoodsFromSearch = (value)=>createAxios("get",url+"goods/getGoodsFromSearch",value)
// 搜索加 分页
const getGoodsFromPageAndSearch =(value)=>createAxios("get",url+"goods/getGoodsFromPageAndSearch",value)

// 角色页路由
const addRole = (value)=>createAxios("post",url+"role/addRole",value)
// 获取角色
const getRoles =()=>createAxios("get",url+"role/getRoles")

// 角色分页
const getRolesFromPage = (value)=>createAxios("get",url+"role/getRolesFromPage",value)
// 删除一个角色
const deleteOneRole = (value)=>createAxios("post",url+"role/deleteOneRole",value)
// 修改角色
const setRolePower =(value)=>createAxios("post",url+"role/setRolePower",value)
// 获取角色名
const getRoleName = ()=>createAxios("get",url+"role/getRoleName")

// 添加用户
const addUser = (value)=>createAxios("post",url+"user/addUser",value)
// 获取用户们
const getUsers =()=>createAxios("get",url+"user/getUsers")
// 删除用户
const deleteUser = (value)=>createAxios("post",url+"user/deleteUser",value)
// 改变用户信息
const changeUser = (value)=>createAxios("post",url+"user/changeUser",value)
export {
    url,
login,weather,avoidLand,exitSession,
addAcount,getAcount,getPageAcount,changeKindName,deleteKindName,
getKinds,uploadPicUrl,submitGoods,removeOnePicture,removeSomePicture,getGoods,getGoodsFromPage,deleteGoods,changeGoods,getGoodsFromSearch,getGoodsFromPageAndSearch,addRole,getRoles,getRolesFromPage,deleteOneRole,setRolePower,getRoleName,addUser,getUsers,deleteUser,changeUser
}
