import React, { useEffect } from "react";
import "../../../assets/css/kinds.scss"
import { Card, Table, Tag,Popconfirm} from "antd";
import AddKinds from "../../../components/shop/AddKinds";
import { useState } from "react";
import { changeKindName, deleteKindName, getAcount, getPageAcount } from "../../../API/url";
const { Column } = Table;
//分页器的页数
let sorterLen = 0;
// 分页器的当前页码
let currentPage = 1;
//变后的分类名
let newName = ""
export default function Kinds() {
  let [arr, setArr] = useState([]);
  //获取分类
  useEffect(() => {
    getAcount().then(({ data }) => {
      let { len, tenData } = data;
      sorterLen = len;
      setArr(tenData);
    });
    // eslint-disable-next-line
  }, []);
  //分页器函数
  const sorterChange = async (page, pageSize) => {
    currentPage = page;
    refreash()
  };
// 修改分类
  const updateConfirm = ({accountName}) => {

    changeKindName({preName:accountName,newName}).then(({code})=>{
      if(code)refreash()
    })
    // newName = ""
  };
  const  changName =(ev)=>{
    newName = ev.target.value
  }
  // 删除分类
  const deleteConfirm=async (text)=>{
    deleteKindName({_id:text}).then(()=>{
      refreash()
    })
  }
  // 取消键
  const cancel = (e) => {
    newName = ""
  };

  // 刷新操作 
  const refreash = async ()=>{
    let {data} = await getPageAcount({current:currentPage,pageSize:10})
    setArr(data)
  }
  return (
    <div>
      <Card
        title="一级分类"
        extra={<AddKinds currentPage={currentPage} refreash = {refreash} setArr={setArr}></AddKinds>}
      >
        <Table
          dataSource={arr}
          // bordered={true}
          pagination={{
            pageSize: 10, //分页显示的数据条数
            total: sorterLen,
            onChange: sorterChange,
          }}
        >
          <Column
            title="分类名"
            align="center"
            dataIndex="accountName"
            key="accountName"
          />
          <Column
            title="操作"
            dataIndex="_id"
            render={(text,record) =>{
              return  (
                <>
                  <Popconfirm
                    title="修改分类名"
                    description={()=>(<>
                    <input type="text" onBlur={changName} />
                    </>)}
                    onConfirm={()=>updateConfirm(record)}
                    onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Tag color={"pink"}>修改分类名</Tag>
                  </Popconfirm>

                  <Popconfirm
                    title="删除分类名"
                    onConfirm={()=>deleteConfirm(text)}
                    onCancel={cancel}
                    okText="确定"
                    cancelText="取消"
                  >
                  <Tag color={"red"}>删除分类</Tag>
                  </Popconfirm>
  
                </>
              )
            }}
          />
        </Table>
      </Card>
    </div>
  );
}
