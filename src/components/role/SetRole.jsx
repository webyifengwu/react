import { Button, Modal, Input } from "antd";
import React from "react";
import { useState } from "react";
import { addRole, getRoles } from "../../API/url";
let newRoleName = "";
export default function SetRole({initData}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  //点击确认后
  const handleOk = async () => {
    //发送请求
    addRole({roleName:newRoleName}).then(()=>{
      getRoles().then(({ data }) => {
        initData(data.tenData, data.len);
      });  
    });
    setIsModalOpen(false);
    
  
  };
  //点击取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //改变输入框内容
  const onChangeInput = (data) => {
    newRoleName = data.target.value;
  };

  return (
    <div style={{display:"inline-block"}}>
      <Button type="primary" onClick={showModal}>
        添加角色
      </Button>
      <Modal
        title="添加角色"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Input placeholder="角色名" onBlur={onChangeInput} />
      </Modal>
    </div>
  );
}
