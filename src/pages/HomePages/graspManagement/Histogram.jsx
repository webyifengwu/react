import "../../../assets/css/histogram.scss"
import React, { useEffect, useRef } from 'react'


import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {
    BarChart
} from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {
    CanvasRenderer
} from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);

// 柱形图
export default function Histogram() {

  const domRef = useRef()

  useEffect(()=>{
    // 使用echarts必须使用useRef
    let myChart = echarts.init(domRef.current)

    myChart.setOption({

      tooltip: {},
      xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 100, 20]
      }]
  });
  },[])

  return (
    <div className='histogram' ref={domRef}></div>
  )
}
