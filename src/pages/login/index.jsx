import logo from '@/assets/logo.gif';
import { Card , Form , Input , Checkbox, Button,message} from 'antd';
import './index.scss'
import { useStore } from '@/store';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';



const Login = () => {
    const {LoginStore} = useStore();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log(values);
        // values: 放置的是所有表单项中用户输入的内容
        // todo：登录
        try {
            await LoginStore.getToken({
                mobile: values.phone_number,
                code: values.verification_code,
            })
            //跳转首页，编程式导航
            navigate('/',{replace: true});
            // 提示用户
            message.success('Login successfully')
        } catch (e) {
            message.error(e.response?.data?.message || 'Login failed');
        }
    }

    const onFinishFailed = errorInfo => {
        console.log('failed:',errorInfo);
    }
    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                {/* 子项用到的触发事件 ， 都需要在Form中都声明一下才可以 */}
                <Form
                 initialValues={{
                    remember: true,
                    phone_number: '13811111111',
                    verification_code: '246810',
                  }}
                  validateTrigger={['onBlur','onChange']}  //定义何时进行校验

                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="phone_number"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your phone number!',
                            },
                            {
                                pattern: /^1[3-9]\d{9}$/,
                                message: '请输入正确的手机号',
                                validateTrigger: 'onBlur',
                            }
                          ]}
                    >
                        <Input size="large" placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="verification_code"
                        rules={[
                            {
                            required: true,
                            message: 'Please input the six-digit verification code！',
                            },
                            { len: 6, message: '验证码6个字符', validateTrigger: 'onBlur' },
                        ]}
                    >
                        <Input size="large" placeholder="verification code" />
                    </Form.Item>
                    <Form.Item
                        name="remember"
                        valuePropName='checked'
                    >
                        <Checkbox className="login-checkbox-label">
                        我已阅读并同意「用户协议」和「隐私条款」
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                        Login
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            
        </div>
    )
}

export default observer(Login);