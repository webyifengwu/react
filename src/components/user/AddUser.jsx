import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState, useCallback } from "react";
import { useEffect } from "react";
import { addUser, changeUser, getRoleName, getUsers } from "../../API/url";
export default function AddUser({
  uploadForm,
  showModal,
  initData,
  setIsModalOpen,
  isModalOpen,
}) {

  const [roleArr, setRoleArr] = useState([]);
  const [form] = Form.useForm();
  const [btnName, setBtn] = useState("添加");
  const [modaltTitle, setTitle] = useState("添加用户");
  const [isChange, setBol] = useState(false);

  // 账号验证函数
  const validatorUserName = useCallback((_, value) => {
    //正则验证
    //正则表达式
    let reg = /^[\u4e00-\u9fa5_\w]{3,14}$/;

    return new Promise((res, rej) => {
      if (value === "") {
        rej("不能为空");
      } else if (!reg.test(value)) {
        rej("须要提供3-14字");
      } else {
        res();
      }
    });
  }, []);

  //密码验证
  const validatorUserPassword = useCallback((_, value) => {
    //正则验证
    //正则表达式
    let reg = /^[\w_`~!@#$%^&*()+=-\\\]\]{}:;',.<>/?]{6,15}$/;
    return new Promise((res, rej) => {
      if (value === "") {
        rej("不能为空");
      } else if (!reg.test(value)) {
        rej("须要提供6-15个字母或数字");
      } else {
        //必须有返回成功的状态 不然会出现不报错 但是有些功能不能使用的情况
        res();
      }
    });
  }, []);

  //手机号码验证

  const validatorPhone = useCallback((_, value) => {
    //正则验证
    //正则表达式
    let reg = /^1[3-9]\d{9}$/;
    return new Promise((res, rej) => {
      if (value === "") {
        rej("不能为空");
      } else if (!reg.test(value)) {
        rej("请正确输入电话号码");
      } else {
        //必须有返回成功的状态 不然会出现不报错 但是有些功能不能使用的情况
        res();
      }
    });
  }, []);
  useEffect(() => {
    getRoleName().then(({ data }) => {
      setRoleArr(data);
    });
  }, []);
  // 修改值
  useEffect(() => {
    form.setFieldsValue(uploadForm);
    if (uploadForm._id) {
      setBol(true)
      setBtn("修改");
      setTitle("修改用户信息");
    } else {
      setBol(false)
      setBtn("添加");
      setTitle("添加用户");
    }
    // eslint-disable-next-line
  }, [uploadForm]);

  //对话框 点击取消
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 提交成功
  const onFinish = (values) => {

    if (isChange) {
      //修改
      values._id = uploadForm._id
      changeUser(values).then(({ code }) => {
        if (code) {
          getUsers().then(({ data }) => {
            initData(data.tenData, data.len);
            setIsModalOpen(false);
          });
        }
      });
    } else {
      //添加
      addUser(values).then(() => {
        getUsers().then(({ data }) => {
          initData(data.tenData, data.len);
          setIsModalOpen(false);
        });
      });
    }
  };

  // 提交失败
  const onFinishFailed = (errorInfo) => {
  };

  // 选择项
  const handleChange = (value) => {
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{ marginLeft: "15px" }}>
        添加用户
      </Button>
      <Modal
        forceRender
        title={modaltTitle}
        open={isModalOpen}
        footer={null}
        // onOk={handleOk}
        onCancel={handleCancel}
        // okText="确定"
        // cancelText="取消"
      >
        <Form
          name="basic"
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="用户名"
            name="username"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: validatorUserName,
              },
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: validatorUserPassword,
              },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: validatorPhone,
              },
            ]}
          >
            <Input placeholder="请输入电话号码" />
          </Form.Item>

          <Form.Item
            label="角色"
            name="role"
            rules={[
              {
                required: true,
                message: "请输入角色身份!",
              },
            ]}
          >
            <Select
              placeholder="请输入角色身份"
              style={{
                width: 315,
              }}
              onChange={handleChange}
              options={roleArr}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              //   span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" style={{ width: "150px" }}>
              {btnName}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
