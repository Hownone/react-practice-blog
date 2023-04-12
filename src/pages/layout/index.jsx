import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet,useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite';


const { Header, Sider } = Layout

const MyLayout = () => {
  const location = useLocation(); //用来获取当前的页面路径，这里主要用来激活菜单高亮
  const {pathname} = location;
  const {UserStore, LoginStore,channelStore} = useStore();
  useEffect(() => {
    UserStore.getUserInfo();
    channelStore.loadChannelList();
  },[UserStore,channelStore]) 
  //这里只需要在页面初始化加载完时拉取一次数据，所以[]即可
  //这里添加UserStore并不是意味着它一个响应式变量，仅仅是加上不会爆语法错误\


  //确定退出
  const navigate = useNavigate();
  const handelConfirm = () => {
    //退出登录: 1. 删除token 2. 跳回到登录页面
    LoginStore.loginOut();
    navigate('/login');
  }
  

  const handelCancel = () => {

  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{UserStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={handelConfirm}
              onCancel={handelCancel} 
              title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={180} className="site-layout-background">
          {/* 高亮原理： defaultSelecteKeys 等于哪个key就哪个高亮 */}
          {/* 获取当前激活的path路径 */}
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由 */}
          <Outlet/>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(MyLayout); //需要用到数据影响到视图，则需要用observer包裹组件做到与mobx的连接