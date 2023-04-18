// 封装组件

import * as echarts from 'echarts'
import { useRef, useEffect } from 'react';

const Bar = ({ title, xData, yData, style }) => {
    const domRef = useRef(null);
    //执行echarts初始化函数
    useEffect(() => {
        const chartInit = () => {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(domRef.current);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: title
                },
                tooltip: {},
                xAxis: {
                    data: xData
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',
                        data: yData,
                    }
                ]
            });
        }
        chartInit();
    }, [xData,yData,title]);

    return (
        <div>
            {/* 准备一个挂载结点 */}
            <div ref={domRef} style={style}>

            </div>
        </div>
    );

}

export default Bar;