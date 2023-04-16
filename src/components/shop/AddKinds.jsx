import { Button, Modal, Input } from "antd";
import { useState } from "react";
import { addAcount } from "../../API/url";
let value = ""
export default function AddKinds({refreash}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  //点击确认后
  const  handleOk = async () => {
    //发送请求
    let isexist = await addAcount({value})
    if(isexist.code){
     refreash()
    }
    setIsModalOpen(false);
    
  };
  //点击取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //改变输入框内容
  const onChangeInput = (data) => {
    value = data.target.value
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        添加分类
      </Button>
      <Modal
        title="添加分类"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Input placeholder="内容"   onBlur={onChangeInput}  />
      </Modal>
    </div>
  );
}
