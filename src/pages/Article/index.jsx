import { Link, useNavigate} from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select,Popconfirm  } from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import img404 from '@/assets/error.png'
import { http } from '@/utils'
import { useEffect, useState } from 'react'
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const {channelStore} = useStore();

    //文章列表管理 统一管理数据，将来修改给setList传对象
    const [article, setArticleList] = useState({
      list: [], //文章列表
      count: 0 //文章数量
    })


    // 文章参数管理
    // 调用后端接口获取数据时也需要添加这个参数
    const [params,setParams] = useState({
        page: 1, // 当前页数
        per_page: 10 //每页展现多少文章
    });
    //这里与上面的写法略有不同
    //这里要将函数体整个放在useEffect里面
    //是因为这里拉取文章的时候需要依赖于params参数进行更新获取后端数据
    //因此要在useEffect的[]添加依赖项params，将整个函数体放在里面
    //其实上面的写法也可以放在里面的，因为若将函数写在useEffect外面的话，每次更新的时候都会执行这个函数，就没有必要了
    //放在useEffect回调函数的里面比较适合
    /*
        如果异步请求函数需要依赖一些数据的变化而重新执行
        推荐把它写在内部
        统一不抽离函数到外面，只要涉及到异步请求的函数，都放到useEffect内部
        本质区别： 写到外面每次组件更新都会重新进行函数初始化，这本身就是一次性能消耗
        而写到useEffect中，只会在依赖项发生变化的时候，函数才会进行重新初始化,避免性能损失
    */
    // useEffect(() => {
    //     const loadList = async () => {
    //         const res = await http.get('/mp/articles',{params});
    //         console.log("list:",res);
    //         const {results,total_count} = res.data;
    //         setArticleData({
    //           list: results,
    //           count: total_count,
    //         })
    //     }
    //     loadList();
    // }, [params]);

    useEffect(() => {
      async function fetchArticleList() {
        const res = await http.get('/mp/articles', { params })
        const { results, total_count } = res.data;
        //console.log(res.data);
        setArticleList({
          list: results,
          count: total_count
        })
      }
      fetchArticleList();
    }, [params])

    // 筛选功能
    //点击筛选按钮，修改params参数
    const handelFinish = (values) => {
        console.log(values);
        const {status,channel_id,date} = values;
        //格式化表单数据
        const _params = {};
        if (status !== -1) { // -1表示全选，需要特判
          _params.status = status;
        } else _params.status = undefined;

        if (channel_id) {
          _params.channel_id = channel_id;
        }

        if (date) {
          _params.begin_pubdate = date[0].format('YYYY-MM-DD'); //格式化成后端要求的格式
          _params.end_pubdate = date[1].format('YYYY-MM-DD');
        }
        //console.log(_params);

        // 修改params数据，引起接口的重新发送
        setParams({
          ...params,
          ..._params,
        }); //修改的时候是，对象属性的合并是一个整体覆盖
    }

    //修改分页的页数参数
    const pageChange = (page) => {
      console.log(page);
      setParams({
        ...params,
        page
      });
    }

    //删除文章
    const delArticle = async (data) => {
      console.log(data);
      await http.delete(`/mp/articles/${data.id}`);
      //刷新一下列表
      //只需要修改params依赖，就会自动调用useEffect获取新的列表
      setParams({
        ...params,
        page: 1, // 删掉后重新获取第一页的数据
      })
    }

    //跳转到publish
    const navigate = useNavigate();
    const goPublish = (data) => {
      //注意：useNavigate()只能放在组件里执行，不能放在函数中
      navigate(`/publish?id=${data.id}`);
    }

    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width:120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data => <Tag color="green">审核通过</Tag>
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button 
                    type="primary" 
                    shape="circle" 
                    icon={<EditOutlined />}
                    onClick={() => goPublish(data)} />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={
                        <Popconfirm
                          onConfirm={() => delArticle(data)}
                          title="是否确认删除？" okText="删除" cancelText="取消">
                          <DeleteOutlined />
                      </Popconfirm>
                  }
                >
                </Button>
              </Space>
            )
          }
        }
      ]

    // const data = [
    //     {
    //         id: '8218',
    //         comment_count: 0,
    //         cover: {
    //           images:['https://cdn.acwing.com/media/article/image/2023/04/12/118375_38c8f3f3d8-97309_lg_7015133fb0.png'],
    //         },
    //         like_count: 0,
    //         pubdate: '2019-03-11 09:00:00',
    //         read_count: 2,
    //         status: 2,
    //         title: 'wkwebview离线化加载h5资源解决方案' 
    //     }
    // ]

    return (
        <div>
            <Card
                title={
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>内容管理</Breadcrumb.Item>
                </Breadcrumb>
                }
                style={{ marginBottom: 20 }}
            >
                <Form 
                    onFinish={handelFinish}
                    initialValues={{ status: -1 }}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id" >
                        <Select placeholder="请选择文章频道" style={{ width: 200 }} >
                        {channelStore.channelList.map(item => (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                        ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/* 文章列表区 */}
            <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
                <Table 
                  rowKey="id" 
                  columns={columns} 
                  dataSource={article.list} 
                  //分页配置
                  pagination={{
                    pageSize: params.per_page,
                    total: article.count,
                    onChange: pageChange, //点击分页按钮的触发函数
                  }
                  } />
            </Card>
        </div>
    )
}

export default observer(Article);