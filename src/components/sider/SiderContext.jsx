import {
  AppstoreTwoTone,
  PieChartOutlined,
  HomeTwoTone,
  UserOutlined,
  UsergroupAddOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  LineChartOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
let obj = {
  AppstoreTwoTone: <AppstoreTwoTone />,
  PieChartOutlined: <PieChartOutlined />,
  HomeTwoTone: <HomeTwoTone />,
  UserOutlined: <UserOutlined />,
  UsergroupAddOutlined: <UsergroupAddOutlined />,
  UnorderedListOutlined: <UnorderedListOutlined />,
  ToolOutlined: <ToolOutlined />,
  LineChartOutlined: <LineChartOutlined />,
  BarChartOutlined: <BarChartOutlined />,
};


const changeArr = (arr) => {
  arr.sort((a, b) => a.key - b.key);
  let newArr = [];
  newArr = arr.map((item) => {
    if (item.children) {
       return getItem(item.title,item.key,obj[item.icon],changeArr(item.children))

    } else {
      return getItem(
        <Link to={item.to} state={item.state}>
          {item.title}
        </Link>,
        item.key,
        obj[item.icon]
      );
    }
  });

  return newArr;
};



export default function SiderContext({ rolePower }) {
  let bbt = changeArr(rolePower);
  return (
    <Menu
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      theme="dark"
      items={bbt}
    />
  );
}
