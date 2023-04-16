import { Card, Table, Popconfirm, Tag } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { getRoles, getRolesFromPage, deleteOneRole } from "../../../API/url";
import SetPower from "../../../components/role/SetPower";
import SetRole from "../../../components/role/SetRole";
const { Column } = Table;
let current = 1;
export default function Role() {
  let [roleArr, setRoleArr] = useState([]);
  let [sortLen, setSortLen] = useState(0);
  let [radio, setRadio] = useState([]);
  let [currentRole,setCurrentRole]=useState({})
  useEffect(() => {
    getRoles().then(({ data }) => {
      initData(data.tenData, data.len);
    });
  }, []);
  // 分页变化
  const onChangePage = (page) => {
    current = page;
    refreash();
  };
  // 删除单个role
  const deleteConfirm = (text) => {
    deleteOneRole({ _id: text }).then(() => {
            refreash();
    });
  };
  // 选中圆框
  const changeRole = (selectedRowKeys) => {
    setRadio(selectedRowKeys);
    setCurrent(selectedRowKeys)
  };
  // 选中整行
  const onRow = (value) => {
    setRadio([value.key]);
    setCurrent(value.key)
  };

  // 设置当前选中的role
  const setCurrent = (key)=>{
      for (const item of roleArr) {
        if(item.key === key){
          setCurrentRole(item)
          break
        }
      
      }
  }


  // 初始化数据
  const initData = (data, len) => {
    setRoleArr(data);
    setSortLen(len);
  };

  //刷新
  const refreash = async () => {
    let { data } = await getRolesFromPage({ current, pageSize: 10 });
    setRoleArr(data);
  };
  return (
    <div className="roleManagement">
      <Card
        title={
          <>
            <SetRole initData={initData}></SetRole>
            <SetPower radio={radio} currentRole={currentRole} refreash={refreash}></SetPower>
          </>
        }
      >
        <Table
          dataSource={roleArr}
          rowSelection={{
            type: "radio",
            onChange: changeRole,
            selectedRowKeys: radio,
          }}
          onRow={(record) => {
            return {
              onClick: () => onRow(record),
            };
          }}
          pagination={{
            defaultCurrent: 1,
            pageSize: 10, //分页显示的数据条数
            total: sortLen,
            current: current,
            onChange: onChangePage,
            hideOnSinglePage:true
          }}
        >
          <Column title="角色" align="center" dataIndex="roleName" />
          <Column title="授权时间" align="center" dataIndex="roleTime" />
          <Column title="授权人" align="center" dataIndex="creator" />
          <Column
            title="操作"
            align="center"
            dataIndex="_id"
            render={(text) => (
              <Popconfirm
                title="删除角色"
                onConfirm={() => deleteConfirm(text)}
                okText="确定"
                cancelText="取消"
              >
                <Tag color={"red"}>删除角色</Tag>
              </Popconfirm>
            )}
          />
        </Table>
      </Card>
    </div>
  );
}
