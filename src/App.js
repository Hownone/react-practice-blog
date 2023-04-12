import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Layout from './pages/layout';
import Login from '@/pages/login'
import { observer } from 'mobx-react-lite';
import { AuthComponent } from './components/AuthComponent';
import './App.css';
import Home from './pages/Home';
import Article from './pages/Article';
import Publish from './pages/Publish';
import { history } from './utils/history';


function App() {
  return (
    //路由配置
    //由BrowserRouter换成HistoryRouter可支持在组件外实现路由跳转 /utils/http.js里用到history.push()
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 创建路由path和组件对应关系 */}
          {/* Layout需要鉴权处理 */}

          <Route path='/' element={
            <AuthComponent>
              <Layout />
            </AuthComponent>
          }>
            {/* index属性表示默认 */}
            <Route index element={<Home />}></Route>
            <Route path='article' element={<Article />}></Route>
            <Route path='publish' element={<Publish />}></Route>
          </Route>
          {/* 登录页面不需要鉴权 */}
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  );
}

export default observer(App);
