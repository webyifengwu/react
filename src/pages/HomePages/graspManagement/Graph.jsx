import "../../../assets/css/graph.scss";
import React, { useRef, useEffect } from "react";

import * as echarts from "echarts";

// 基于准备好的dom，初始化echarts实例
// 曲线图
export default function Graph() {
  const domRef = useRef();
  
  useEffect(()=>{
    
    let myChart = echarts.init(domRef.current);
    myChart.setOption({
      tooltip: {},

      xAxis:{
        data:[1,3,5,7,9,8]
      },
      yAxis:{
        type:'value'
      },
      series:[
        {
          name:"第一条折线图",
          type:"line",
          // smooth:true,
          data:[1,5,9,7,5,10]
        }
      ]
    })

  },[])
  return <div className="graph" ref={domRef}></div>;
}
