import { Button, Modal, Input, Tree } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { setRolePower } from "../../API/url";
let rolePower = [];
export default function SetPower({ radio, currentRole,refreash }) {
  // 树结构
  
  const treeData = [
    {
      title: "首页",
      key: "0",
      to:"/home/page",
      state:{name:"首页"},
      icon:"HomeTwoTone",
    },
    {
      title: "商品",
      key: "1",
      icon:"AppstoreTwoTone",
      children: [
        {
          title: "商品分类",
          key: "1-0",
          to:"/home/kinds",
          state:{name:"商品分类"},
          icon:"UnorderedListOutlined",
          disabled:true
        },
        {
          title: "商品管理",
          key: "1-1",
          to:"/home/goods",
          state:{name:"商品管理"},
          icon:"ToolOutlined",
          disabled:true
        },
      ],
    },
    {
      title: "用户管理",
      key: "2",
      to:"/home/usermanage",
      state:{name:"用户管理"},
      icon:"UserOutlined",
    },
    {
      title: "角色管理",
      key: "3",
      to:"/home/rolemanage",
      state:{name:"角色管理"},
      icon:"UsergroupAddOutlined",
    },
    {
      title: "图形管理",
      key: "4",
      icon:"PieChartOutlined",
      children: [
        {
          title: "柱形图",
          key: "4-0",
          to:"/home/histogram",
          state:{name:"柱形图"},
          icon:"BarChartOutlined",
          disabled:true

        },
        {
          title: "饼图",
          key: "4-1",
          to:"/home/pie",
          state:{name:"饼图"},
          icon:"LineChartOutlined",
          disabled:true
        },
        {
          title: "曲形图",
          key: "4-2",
          to:"/home/graph",
          state:{name:"曲形图"},
          icon:"PieChartOutlined",
          disabled:true
        },
      ],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roleShowPower,setRoleShowPower] =useState([])
  useEffect(()=>{
    
    setRoleShowPower(currentRole.roleShowPower)
    // eslint-disable-next-line
  },[radio])
  const showModal = () => {
    if (radio.length) setIsModalOpen(true);
  };
  //点击确认后
  const handleOk = async () => {
    //发送请求
     setRolePower({roleShowPower, rolePower,_id:currentRole._id}).then((data)=>{
        setIsModalOpen(false);
        refreash()
     })
  };
  //点击取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //改变输入框内容
  const onChecked = (checkedKeys, e) => {
    setRoleShowPower(checkedKeys)
    rolePower = e.checkedNodes;
  };

  return (
    <div style={{ display: "inline-block", marginLeft: "30px" }}>
      <Button type="primary" onClick={showModal}>
        设置用户权限
      </Button>
      <Modal
        title="添加角色"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <div>
          <span>角色名：</span>
          <Input
            style={{ width: "50%", marginBottom: "15px" }}
            disabled
            value={currentRole.roleName}
          ></Input>

          <Tree
            onCheck={onChecked}
            checkable
            checkedKeys={roleShowPower}
            defaultExpandAll
            treeData={treeData}
            blockNode
          />
        </div>
      </Modal>
    </div>
  );
}
