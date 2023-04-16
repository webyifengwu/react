import axios from "axios"
import { message } from 'antd';

//请求拦截
axios.interceptors.request.use(
function (config) {
    // console.log(config);

    
    // 在发送请求之前做些什么
    config.withCredentials =true
    return config;
  }, 
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

async function createAxios(type, url, data) {
    if (type.toLocaleLowerCase() === 'get') {
        return await new Promise((res,rej)=>{
            getAxios(url,data,res,rej)
        })
    } else {
        return await new Promise((res,rej)=>{
            postAxios(url,data,res,rej)
        })
    }
}
// get 获取
function getAxios(url, params,res,rej) {
    axios.get(url, {
        params
    }).then(({ data }) => {
        useMessage(data)
        res(data)
    }).catch((err) => {
        rej(err)
    })
}
// post 获取
function postAxios(url, data = {},res,rej) {
    axios.post(url,data).then(({ data }) => {
        useMessage(data)
        res(data)
    }).catch((err) => {
        rej(err)
    })
}


// message的弹窗
function  useMessage({code,value}) {
    if(code){
        message.success({
            content:value,
            duration:1
        })
    }else{
        message.error({
            content:value,
            duration:1
        })
    }

}
// 带有 异步请求的需要这样导出 不然会报错
export default createAxios