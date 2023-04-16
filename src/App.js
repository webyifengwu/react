import {  useNavigate, useRoutes} from"react-router-dom"
import route  from "./router";
// import {getSession} from "./API/session"
import { useEffect } from "react";
import { avoidLand } from "./API/url";
import { setSession } from "./API/session";
function App() {
  const router = useRoutes(route)
  const navigate = useNavigate()
  // let user =getSession("user")

  // 设置自动登录验证
  useEffect(()=>{
    avoidLand().then((data)=>{
      if(data.code){
        setSession("user",data.data.data)
        navigate("/home/page",{state:{name:"首页"}})
      }else{
        navigate("/")
      }
    })
    //eslint-disable-next-line
  },[])
  return (
    <div className="App">
      {router}
    </div>
  );
}
export default App;
