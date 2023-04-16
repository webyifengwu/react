const mongoAccount = require("../../mongodb/mongoAccount");
const mongoGoods = require("../../mongodb/mongoGoods");
const path = require('path')
const fs = require('fs')

// 添加分类                        数据 用户id
const addGoodsAccount = async ({ value }, id) => {
    if (!id) return { code: 0, value: "账号未登录", data: {} }
    //查询是否已经存在
    let bol = await mongoAccount.findOne({ accountAbout: id._data, accountName: value })
    if (bol) return { code: 0, value: "已存在该类,请勿重复添加", data: {} }
    let date = Date.now() + ""
    let result = await mongoAccount.create({
        accountName: value,
        accountTime: date,
        // 表关联
        accountAbout: id.data ? id.data._id : "",
        key: date
    });
    return { code: 1, value: "分类添加成功！", data: result }
}
//获取数据的长度 以及前十条数据
const getKinds = async () => {
    let result = await mongoAccount.find({})
    let len = result.length
    let tenData = result.splice(0, 10);
    return {
        code: 1, value: "分类获取成功", data: {
            len,
            tenData
        }
    }
}

//获取分页的数据
const getKindsFromPage = async ({ current, pageSize }) => {
    // pagesize 默认为10
    let num = current * pageSize - pageSize;
    let result = await mongoAccount.find({}, {}, { skip: num, limit: pageSize })
    return { code: 1, value: `第${current}页分类数据获取成功！`, data: result }
}
//修改分类名
const postUpdateAcount = async ({ preName, newName }) => {
    // 看看是否有重复
    let bol = await mongoAccount.find({ accountName: newName })
    if (!bol.length) {//不重复
        let result = await mongoAccount.updateOne({ accountName: preName }, { accountName: newName })
        return {
            code: 1, value: "分类名修改成功！", data: result
        }
    } else {
        return {
            code: 0, value: "新添加的分类重复,修改失败!", data: {}
        }
    }

}
//删除分类名
const postDeleteAccount = async ({ _id }) => {
    let result = await mongoAccount.deleteOne({ _id })
    return { code: 1, value: "删除成功", data: result }
}

// 商品api
const getAllKindsName = async () => {
    let result = await mongoAccount.find({}, { accountName: 1, _id: 0 })
    result = result.map((item) => {
        let obj = {
            value: item.accountName,
            // label: item.accountName
        }
        return obj
    })
    return { code: 1, value: "获取分类名成功！", data: result }
}
// 添加商品信息
const addGoodsConclusion = async ({ goodsKind, goodsName, goodsDescription, goodsPrice, goodsPicture }, Root) => {
    if (!Root.data) return { code: 0, value: "未登录，请先登录再操作", data: {} }
    let isExist = await mongoGoods.findOne({ goodsName })
    if (!isExist) {
        let date = Date.now() + ""
        let result = await mongoGoods.create({
            goodsKind,
            goodsName,
            goodsDescription,
            goodsPrice,
            goodsPicture,
            goodsTime: new Date(),
            goodsAbout: Root.data ? Root.data._id : "",
            key: date
        })

        return { code: 1, value: "新添商品成功！", data: { result } }
    } else {
        return { code: 0, value: "该商品名重复！添加失败！", data: {} }
    }
}
// 删除图片 删除一张图片的操作
const removeOnePicture = ({ baseUrl, fileName }) => {
    let deleteUrl = path.resolve(__dirname, "../../public/" + baseUrl + fileName)
    fs.unlink(deleteUrl, () => {
    })
    return {
        code: 1, value: `图片： ${fileName} 删除成功！`
    }
}
const removeSomePicture = ({ baseUrl, fileNameArr }) => {
    fileNameArr.map(item => {
        let deleteUrl = path.resolve(__dirname, "../../public/" + baseUrl + item.fileName)
        fs.unlink(deleteUrl, () => {
        })
    })
    return {
        code: 1, value: "多余图片删除成功！", data: {}
    }
}


// 商品页
const getGoods = async () => {
    let result = await mongoGoods.find({})
    let len = result.length
    let fourData = result.splice(0, 4)
    return {
        code: 1, value: "商品信息获取成功！",
        data: {
            len, fourData
        }
    }
}
// 商品页分页
const getGoodsFromPage = async ({ current, pageSize }) => {
    let num = current * pageSize - pageSize;
    let result = await mongoGoods.find({}, {}, { skip: num, limit: pageSize })
    return { code: 1, value: `第${current}页商品数据获取成功！`, data: result }
}
// 删除单个商品
const deleteOneGoods = async ({ _id }) => {
    const result = await mongoGoods.deleteOne({ _id })
    if (result.deletedCount) {
        return { code: 1, value: '删除成功', data: { result } }
    } else {
        return { code: 0, value: "删除失败", data: {} }
    }
}
// 修改商品信息
const changeGoods = async ({ goodsKind,goodsName,goodsDescription,goodsPrice,goodsPicture,id }) => {
    // 首先查看是否已经存在该名字
    const arr = await mongoGoods.find({_id:{$ne:id},goodsName})
    if(!arr.length){
        let result = await mongoGoods.updateOne({_id:id},{ goodsKind,goodsName,goodsDescription,goodsPrice,goodsPicture})
        return {code:1,value:"修改成功！",data:{result}}
    }else{
        return {code:0,value:"商品名重复！修改失败！",data:{arr}}
    }

    // 找的到就修改
}

// 商品搜索
const getGoodsFromSearch = async ({searchText,mode})=>{
    if(mode == 1){//按分类名搜索
        let data = await mongoGoods.find({goodsKind:searchText})
        let len = data.length
        let fourData = data.splice(0,4)
        return {
            code:1,value:"获取搜索结果成功",data:{len,fourData}
        }
    }else if(mode == 2){//按名字搜搜
        let data = await mongoGoods.find({goodsName:searchText})
        let len = data.length
        let fourData = data.splice(0,4)
        return {
            code:1,value:"获取搜索结果成功",data:{len,fourData}
        }
    }
}
// 搜索加分页
const getGoodsFromPageAndSearch = async ({current, pageSize, searchText, searchMode})=>{
    if(searchMode == 1){//按分类        
        let num = current*pageSize - pageSize
        let result = await mongoGoods.find({goodsKind:searchText},{},{skip:num,limit:pageSize})
        return {
            code:1,value:`${current}页数据获取成功！`,data:result
        }
    }else if(searchMode == 2){
        let num = current*pageSize - pageSize
        let result = await mongoGoods.find({goodsName:searchText},{},{skip:num,limit:pageSize})
        return {
            code:1,value:`${current}页数据获取成功！`,data:result
        }
    }

}
module.exports = {
    addGoodsAccount, getKinds,
    getKindsFromPage, postUpdateAcount,
    postDeleteAccount, getAllKindsName, addGoodsConclusion, removeOnePicture, removeSomePicture, getGoods, getGoodsFromPage, deleteOneGoods, changeGoods,getGoodsFromSearch,getGoodsFromPageAndSearch
}

// 