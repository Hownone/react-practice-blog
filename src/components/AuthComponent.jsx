// 1. 判断token是否存在
// 2. 如果存在 直接正常渲染
// 3. 如果不存在 重定向到登录路由

// 高阶组件：把一个组件当成另一个组件的参数传入，然后通过一定的判断，返回新的组件

//中心思想： 找到需要鉴权的组件，用下面写的鉴权组件<AuthComponent>包裹即可

import { getToken } from "@/utils"
import { Navigate } from 'react-router-dom'

const AuthComponent = ({ children }) => {
    const isToken = getToken();
    if (isToken) {
        //若存在token则正常渲染
        return (
            <>
                {children}
            </>
        )
    } else {
        //重定向组件
        return <Navigate to="/login" replace />
    }
}

// <AuthComponent> <Layout/> </AuthComponent>
// 登录(存在token)： <> <Layout></Layout> </>
// 不存在token 则重定向到登录页面

export {
    AuthComponent,
}