import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Form } from "antd";
import { useState } from "react";
import { uploadPicUrl } from "../../API/url";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function UploadPic({removePic,initPic}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(initPic);
  // 预览窗口关闭函数
  const handleCancel = () => {
    return setPreviewOpen(false);
  };
  // 图片预览函数
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // 上传之后的函数
  const handleChange = ({ fileList: newFileList }) => {
    return setFileList(newFileList);
  }
  // 上传按钮 组件
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传图片
      </div>
    </div>
  );

  return (
    <>
    {/* Upload组件须要和Form.Item连用并且Form.Item只能有一个Upload组件 不能有其他标签 不然表单获取数据比较麻烦  */}
      <Form.Item
            label="商品图片"
            name="goodsPicture"
            // valuePropName="file"
            rules={[
              {
                required: true,
                message: "请上传商品图片",
              },
            ]}
      >
        {/* 图片上传区域 */}
        <Upload
        accept=".jsp,.png"
          name="file"
          action={uploadPicUrl}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove={removePic}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
      </Form.Item>
        {/* 图片视口展示区 对话框 */}
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="商品图片"
            style={{
              width: "100%",
            }}
            src={previewImage}
          />
        </Modal>
    </>
    
  );
}
