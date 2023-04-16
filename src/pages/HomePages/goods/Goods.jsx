import React from "react";
import "../../../assets/css/goods.scss";
import { Button, Card, Image, Table, Tag, Popconfirm, Carousel } from "antd";
import GoodTitle from "../../../components/shop/GoodsTitle";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  getGoods,
  getGoodsFromPage,
  url,
  deleteGoods,
  removeSomePicture,
  getGoodsFromSearch,
  getGoodsFromPageAndSearch,
} from "../../../API/url";
import { useState } from "react";
import Column from "antd/es/table/Column";
let current = 1;

export default function Goods() {
  // 这数组必须得有 key属性 不然回报错
  let [arr, setArr] = useState([]);
  let navigate = useNavigate();
  let [sorterLen, setSortLen] = useState(0);
  // 搜索用的参数
  let [searchMode, setMode] = useState("默认(不搜索)");
  let [searchText, setText] = useState("");
  useEffect(() => {
    getGoods().then(({ data }) => {
      setInit(data.len, data.fourData);
    });
  }, []);
  const setInit = (len, data) => {
    setSortLen(len);
    setArr(data);
  };

  //分页器函数
  const sorterChange = async (page, pageSize) => {
    current = page;
    refreash();
  };
  // 操作事件
  const cancle = () => {
  };
  // 删除确认键
  const deleteConfirm = async (id, record) => {
    let arr = getDeletePicUrlArr(record);
    deleteGoods({ _id: id }).then();
    removeSomePicture(arr).then();
    refreash();
  };
  // 处理需要删除的图片信息
  const getDeletePicUrlArr = (record) => {
    let arr = record.goodsPicture;
    arr = arr.map((item) => {
      let obj = {};
      obj.fileName = item.imgUrl.split("/")[1];
      return obj;
    });
    return arr;
  };
  // 修改确认键
  const changeConfirm = (record) => {
    navigate("/home/addGood", {
      state: { name: "修改商品信息", preData: record },
    });
  };
  // 刷新
  const refreash = async () => {
    // 从搜索词 决定
    if (searchText) {
      //非空时执行
      if (searchMode === "按分类查找") {
        let { data } = await getGoodsFromPageAndSearch({
          current,
          pageSize: 4,
          searchText,
          searchMode: 1,
        });
        setArr(data);
      } else if (searchMode === "按名字查找") {
        let { data } = await getGoodsFromPageAndSearch({
          current,
          pageSize: 4,
          searchText,
          searchMode: 2,
        });
        setArr(data);
      } else {
        let { data } = await getGoodsFromPage({ current, pageSize: 4 });
        setArr(data);
      }
    } else {
      //非搜索模式
      let { data } = await getGoodsFromPage({ current, pageSize: 4 });
      setArr(data);
    }
  };
  // 搜索按钮的事件
  const search = async () => {
    if (!searchText) {
      //空搜索词
      current = 1;
      getGoods().then(({ data }) => {
        setInit(data.len, data.fourData);
      });
      return;
    }
    // 获取初始数据 arr 和 sortlen
    if (searchMode === "按分类查找") {
      let { data } = await getGoodsFromSearch({ searchText, mode: 1 });
      current = 1;
      setInit(data.len ? data.len : 1, data.fourData);
    } else if (searchMode === "按名字查找") {
      let { data } = await getGoodsFromSearch({ searchText, mode: 2 });
      current = 1;
      setInit(data.len ? data.len : 1, data.fourData);
    }
  };

  return (
    <div>
      <Card
        title={
          <GoodTitle
            setMode={setMode}
            setText={setText}
            search={search}
          ></GoodTitle>
        }
        extra={
          <Button type="primary">
            <Link to="/home/addGood" state={{ name: "发布商品" }}>
              添加商品
            </Link>
          </Button>
        }
      >
        <Table
          dataSource={arr}
          size="large"
          pagination={{
            pageSize: 4, //分页显示的数据条数
            total: sorterLen,
            onChange: sorterChange,
            defaultCurrent:1,
            current:current
          }}
        >
          <Column
            // width={40}
            title="分类"
            dataIndex="goodsKind"
            key="goodsKind"
            align="center"
          ></Column>
          <Column
            // width={60}
            title="名称"
            dataIndex="goodsName"
            align="center"
          ></Column>
          <Column
            // width={80}
            title="描述"
            dataIndex="goodsDescription"
            align="center"
          ></Column>
          <Column
            // width={110}
            title="价格（/元）"
            dataIndex="goodsPrice"
            align="center"
          ></Column>
          <Column
            align="left"
            title="图片"
            dataIndex="goodsPicture"
            render={(text) => {
              return (
                <Carousel autoplay>
                  {text.map((item) => (
                    <div key={item}>
                      <Image
                        className="addPic"
                        src={url + item.imgUrl}
                        width={70}
                        alt="商品图片加载错误！"
                      ></Image>
                    </div>
                  ))}
                </Carousel>
              );
            }}
          ></Column>

          <Column
            // width={150}
            title="操作"
            dataIndex="_id"
            align="center"
            render={(text, record) => (
              <>
                <Popconfirm
                  title="修改商品"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => changeConfirm(record)}
                >
                  <Tag color={"pink"}>修改</Tag>
                </Popconfirm>

                <Popconfirm
                  title="删除该商品"
                  okText="确定"
                  cancelText="取消"
                  onCancel={cancle}
                  onConfirm={() => deleteConfirm(text, record)}
                >
                  <Tag color={"red"}>删除</Tag>
                </Popconfirm>
              </>
            )}
          ></Column>
        </Table>
      </Card>
    </div>
  );
}
