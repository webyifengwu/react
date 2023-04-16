import React from "react";
import "../../../assets/css/addGoods.scss";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getKinds,
  submitGoods,
  removeOnePicture,
  removeSomePicture,
  url,changeGoods
} from "../../../API/url";
import UploadPic from "../../../components/uploadPic/UploadPic";
// 后端信息
const baseUrl = "shopImg/";
// 决定是否删除图片
let bool = true;
let isChange = false;
export default function AddGoods() {
  bool = true;
  isChange = false;
  // 判断是修改还是新添加
  // 初始数据
  let initData = {
    goodsDescription: "",
    goodsKind: "",
    goodsName: "",
    goodsPicture: [],
    goodsPrice: "",
  };
  // 用来接收传来的数据
  let initDataColon=null;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [kindArr, setKindsArr] = useState([]);

  // 拿分类数据 以及 销毁函数
  useEffect(() => {
    getKinds().then(({ data }) => {
      setKindsArr(data);
    });
    return () => {
      //销毁时的函数
      if (isChange) {
        return;
      }
      if (bool) {
        // 有添加图片再执行此
       if(form.getFieldValue("goodsPicture").fileList){
        if (form.getFieldValue("goodsPicture").fileList.length) {
          removeSomePic();
        }
       }
      }
    };
    // eslint-disable-next-line
  }, []);

  // 修改商品信息操作需要使用location
  const location = useLocation();
  if (location.state.preData) {
    isChange = true;
    initDataColon= location.state.preData;
    for (const key in initData) {
      if (key === "goodsPicture") {
        initData[key] = initDataColon[key].map((item, index) => {
          let obj = {
            uid: `-${index + 1}`,
            name: `${item.imgUrl.split("/")[1]}`,
            status: "done",
            url: `${url}${item.imgUrl}`,
          };
          return obj;
        });
        continue;
      }
      initData[key] = initDataColon[key];
    }
  }

  // 提交按钮事件
  const onFinish = async (values) => {
    // /初始的时候是没有 fileList的
    //判断是否需要改
    values = getImgUrlArr(values);
    if (isChange) {//修改商品信息
      values.id = initDataColon._id
      let data = await changeGoods(values)
      if(data.code){
        navigate("/home/goods", { state: { name: "商品管理" } });
      }
    } else {//创建
      let data = await submitGoods(values);
      if (data.code) {
        bool = false;
        navigate("/home/goods", { state: { name: "商品管理" } });
      }
    }
  };
  // 处理图片信息
  const getImgUrlArr = (values) => {
    let arr = values.goodsPicture.fileList
      ? values.goodsPicture.fileList
      : values.goodsPicture;
    arr = arr.map((item) => {
      let obj = {};
      obj.imgUrl = baseUrl + item.name;
      return obj;
    });
    values.goodsPicture = arr;
    return values;
  };
  // 提交失败
  const onFinishFailed = (values) => {
  };
  // 分类
  const onChange = (value) => {
  };
  const onSearch = (value) => {
  };
  // 删除单张图片的函数
  const removePic = (file) => {
    removeOnePicture({ name: file.name });
  };
  // 删除多张图片
  const removeSomePic = () => {
    // 删除图片的操作
    let fileNameArr = [];
    fileNameArr = form.getFieldValue("goodsPicture").fileList.map((item) => {
      let obj = {};
      obj.fileName = item.name;
      return obj;
    });
    removeSomePicture(fileNameArr).then((data) => {});
  };

  return (
    <div className="addGoods">
      <Button type="primary" onClick={() => navigate(-1)}>
        返回商品管理界面
      </Button>
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 3,
          offset: 1,
        }}
        wrapperCol={{
          span: 17, //长度
          offset: 1, //位移
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={initData}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2 className="title">商品信息填写</h2>
        <Form.Item
          label="商品分类"
          name="goodsKind"
          rules={[
            {
              required: true,
              message: "必须选择商品分类",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="输入商品种类"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            options={kindArr}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            // defaultValue={initData.goodsKind?initData.goodsKind:kindArr[0]}
          />
        </Form.Item>

        <Form.Item
          label="商品名称"
          name="goodsName"
          rules={[
            {
              required: true,
              message: "必须填写商品名称",
            },
          ]}
        >
          <Input placeholder="输入商品名称"></Input>
        </Form.Item>

        <Form.Item
          label="商品描述"
          name="goodsDescription"
          rules={[
            {
              required: true,
              message: "必须填写商品描述",
            },
          ]}
        >
          <Input.TextArea allowClear showCount placeholder="输入商品描述" />
        </Form.Item>

        <Form.Item
          label="商品价格"
          name="goodsPrice"
          type="number"
          rules={[
            {
              required: true,
              message: "必须填写商品价格",
            },
          ]}
        >
          <Input placeholder="请输入商品的价格" addonAfter={"元"}></Input>
        </Form.Item>

        <UploadPic
          removePic={removePic}
          initPic={initData.goodsPicture}
          isChange={isChange}
        ></UploadPic>

        <Form.Item
          wrapperCol={{
            offset: 7,
            // span: 20,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "220px" }}>
            发布商品
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
