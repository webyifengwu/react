import React from "react";
import { Popconfirm } from "antd";
export default function HeaderContext({ username, exit }) {
  return (
    <div>
      <span className="title">欢迎</span>
      <span className="user">{username}</span>
      {/* <span className='exit' onClick={exit}>退出登录</span> */}
      <Popconfirm
        title="退出登录"
        description="你确定要退出登录？"
        okText="确定"
        cancelText="取消"
        onConfirm={exit}
      >
        <span className="exit">退出登录</span>
      </Popconfirm>
    </div>
  );
}
