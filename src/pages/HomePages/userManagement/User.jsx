import { Card, Table, Popconfirm, Tag } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { deleteUser, getUsers } from "../../../API/url";
import AddUser from "../../../components/user/AddUser";
const { Column } = Table;


let  uploadForm = {
  password: "",
  phone: "",
  role: "",
  username: "",
}

export default function User() {
  let [dataArr, setDataArr] = useState([]);
  let [sortLen, setSortLen] = useState(0);
  // 输入框数据
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUsers().then(({ data }) => {
      initData(data.tenData, data.len);
    });
  }, []);

  // 初始化数据
  const initData = (data, len) => {
    setDataArr(data);
    setSortLen(len);
  };
  //删除用户信息
  const deleteConfirm = (text) => {
    deleteUser({ _id: text }).then(() => {
      getUsers().then(({ data }) => {
        initData(data.tenData, data.len);
      });
    });
  };
  // 修改用户信息
  const changeConfirm = (record) => {
    uploadForm ={
      _id:record._id,
      password: record.password,
      phone: record.phone,
      role: record.loginAbout._id,
      username: record.username,
    } 
    setIsModalOpen(true);
  };
  //   添加用户 展开弹窗
  const showModal = () => {
    uploadForm = {
      password: "",
      phone: "",
      role: "",
      username: "",
    }

    setIsModalOpen(true);
  };
  return (
    <div className="userManagement">
      <Card
        title={
          <AddUser
          uploadForm={uploadForm}
            showModal={showModal}
            initData={initData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          ></AddUser>
        }
      >
        <Table
          dataSource={dataArr}
          rowKey="_id"
          pagination={{
            pageSize: 10, //分页显示的数据条数
            total: sortLen,
            hideOnSinglePage: true,
          }}
        >
          <Column title="用户名" align="center" dataIndex="username" />
          <Column title="创建时间" align="center" dataIndex="time" />
          <Column title="手机号" align="center" dataIndex="phone" />
          <Column
            title="角色"
            align="center"
            dataIndex={["loginAbout", "roleName"]}
          />
          <Column
            dataIndex="_id"
            title="操作"
            align="center"
            render={(text, record) => {
              return (
                <>
                  <Popconfirm
                    title="修改用户"
                    onConfirm={() => changeConfirm(record)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Tag color={"red"}>修改用户</Tag>
                  </Popconfirm>

                  <Popconfirm
                    title="删除用户"
                    onConfirm={() => deleteConfirm(text)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Tag color={"red"}>删除用户</Tag>
                  </Popconfirm>
                </>
              );
            }}
          />
        </Table>
      </Card>
    </div>
  );
}
