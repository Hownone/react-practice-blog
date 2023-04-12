import { makeAutoObservable } from 'mobx'
import { getToken, http, setToken, removeToken } from '@/utils';

class LoginStore {
    token = getToken() || '';
    constructor() {
        // 响应式处理
        makeAutoObservable(this);
    }

    getToken = async ({ mobile, code }) => {
        // 调用登录接口
        const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
            mobile,
            code,
        });
        //console.log(res.data);
        // 存入token
        this.token = res.data.token;
        //存入localStorage
        setToken(this.token);
    };

    //退出登录
    loginOut = () => {
        this.token = '';
        removeToken();

    }
}

export default LoginStore;
