import Bar from '@/components/Bar';
import './index.scss'

/*
思路：
1. 看官方文档 把echarts加入项目
    如何在react中获取dom --> useRef
    在什么地方(什么时机)获取dom结点 --> useEffect （执行时机是在dom更新后）
2. 不抽离定制化的参数，先把最小化的demo跑起来
3. 按照需求，哪些参数需要自定义 抽象出来
*/

const Home = () => {
        
    return (
        <div>
            {/* 准备一个挂载结点 */}
            {/* 渲染Bar组件 */}
            <Bar 
                title='主流框架使用满意度' 
                xData={['react','vue','angular']}
                yData={[30,40,50]} 
                style={{width: '500px',height: "400px"}} />
            <Bar title='主流框架使用满意度2'
                 xData={['react','vue','angular']}
                 yData={[60,70,80]}
                 style={{width: '300px',height: "200px"}} />
        </div>
      );
}
 
export default Home;