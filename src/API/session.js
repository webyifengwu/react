const setSession =(key,data)=>{
    sessionStorage.setItem(key,JSON.stringify(data))
}
const getSession =(key)=>{
return JSON.parse(sessionStorage.getItem(key))
}
const removeSession =(key)=>{
    sessionStorage.removeItem(key)
}
export {
    setSession,
    getSession,
    removeSession
}