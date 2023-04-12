import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//导入antd样式文件
import 'antd/dist/reset.css'

//引入index.scss文件
import './index.scss'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

