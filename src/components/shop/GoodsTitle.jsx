import React from "react";
import { Button, Input, Select } from "antd";

export default function GoodTitle({setMode,setText,search}) {
  const handleChange = (value) => {
    setMode(value)
  };
// 搜索键

  // 获取搜索内容
  const getSearchText = (e)=>{
    setText(e.target.value)
  }
  return (
    <div>
      <Select
        defaultValue="默认（不搜索）"
        style={{
          width: 140,
        }}
        onChange={handleChange}
        options={[
          {
            value: "默认（不搜索）",
          },
          {
            value: "按分类查找",
          },
          {
            value: "按名字查找",
          },
        ]}
      />
      <Input style={{width:"200px",margin:"0 8px"}} onBlur={getSearchText}></Input>
      <Button type="primary" onClick={search}>搜索</Button>
    </div>
  );
}
