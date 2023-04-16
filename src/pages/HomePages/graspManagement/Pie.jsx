import "../../../assets/css/pie.scss";
import React, { useEffect, useRef } from "react";

import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart

// 饼图
export default function Pie() {
  const domRef = useRef();

  useEffect(() => {
    // 使用echarts必须使用useRef
    let myChart = echarts.init(domRef.current);

    myChart.setOption({
      tooltip: {
        
      },
      legend:{
        bottom:"5%",
        left:"center"
      },
      series: [
        {
          name: "数据饼图",
          type: "pie",
          radius: ["30%","75%"],
          // roseType: "angle",
          data: [
            { value: 235, name: "视频广告" },
            { value: 274, name: "联盟广告" },
            { value: 310, name: "邮件营销" },
            { value: 335, name: "直接访问" },
            { value: 400, name: "搜索引擎" },
          ],
        },
      ],
    });
  }, []);
  return <div className="pie" ref={domRef}></div>;
}
