// 统一管理
// 先把所有工具函数导出的模块在这里导入
// 然后再统一导出

import { http } from "./http";
import { setToken, getToken, removeToken } from "./token"


export {
    http,
    setToken,
    getToken,
    removeToken,
}

//举个例子：其他组件用的时候只需要 import {http} from '@/utils'
// index.js当文件名时可以直接省略index.js路径