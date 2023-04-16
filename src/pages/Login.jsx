import "../assets/css/login.scss";
import { useCallback } from "react";
import { Button, Form, Input} from "antd";
import { login } from "../API/url";
import { useNavigate } from "react-router-dom";
import {setSession} from "../API/session"
function Login() {
  //编程式 路由
  const navigate =useNavigate()
  //设置表单数据
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
  //登录按钮事件
  const onFinish = async (values) => {
    if (values.username && values.password) {
      let result = await login(values);
      // 跳转主页
      if(result.code){
        setSession('user',result.data)
        navigate("/home/page",{
          replace:true,
          state:{name:"首页"}
        })
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login_box">
      <div className="center">
        <h2>后台登录入口</h2>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="username"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: validatorUserName,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            validateTrigger="onBlur"
            name="password"
            rules={[
              {
                required: true,
                validator: validatorUserPassword,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
