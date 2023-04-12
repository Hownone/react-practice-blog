// 将所有的mobx模块做统一处理
// 导出一个统一的方法 useStore

import LoginStore from './login.Store';
import { createContext, useContext } from 'react'
import UserStore from './user.Store';

class RootStore {
    constructor() {
        this.LoginStore = new LoginStore();
        this.UserStore = new UserStore();
        //
    }
}

// 实例化根
// 导出useStore context

const rootStore = new RootStore();
const context = createContext(rootStore);
const useStore = () => useContext(context);

export {
    useStore
}