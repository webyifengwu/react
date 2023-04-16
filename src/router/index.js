import Home from '../pages/Home'
import Login from '../pages/Login'
import Goods from "../pages/HomePages/goods/Goods"
import User from "../pages/HomePages/userManagement/User"
import Role from "../pages/HomePages/roleManagement/Role"
import Kinds from '../pages/HomePages/goods/Kinds'
import Page from "../pages/HomePages/page/Page"
import Graph from '../pages/HomePages/graspManagement/Graph'
import Pie from '../pages/HomePages/graspManagement/Pie'
import Histogram from '../pages/HomePages/graspManagement/Histogram'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import AddGood from '../pages/HomePages/goods/AddGoods'
// import {Navigate} from "react-router-dom"
// 重定向
function Redirect({ to }) {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(to)
        // eslint-disable-next-line 
    }, [])
}
const route = [
    {
        path: '/',
        element: <Login></Login>
    }, {
        path: "/home",
        element: <Home></Home>,
        children: [{
            path: "page",
            element: <Page></Page>
        }, {
            path: "goods",
            element: <Goods></Goods>
        }, {
        }, {
            path: "kinds",
            element: <Kinds></Kinds>
        }, {
            path:"addGood",
            element:<AddGood></AddGood>
        }, {
            path: "usermanage",
            element: <User></User>
        }, {
            path: "rolemanage",
            element: <Role></Role>
        }, {
            path: "graph",
            element: <Graph></Graph>
        }, {
            path: "pie",
            element: <Pie></Pie>
        }, {
            path: "histogram",
            element: <Histogram></Histogram>
        }
        ]
    }, {
        path: "*",
        element: <Redirect to="/home/page"></Redirect>
    }

]
export default route