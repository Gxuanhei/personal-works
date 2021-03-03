import React, {Component} from 'react';
import axios from 'axios'
import qs from 'qs'
import {Redirect} from 'react-router-dom'
import {Form, Input, Button, message} from 'antd'
import './login.css'


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

class NormalLoginForm extends Component {
    constructor(props:any) {
       super(props);
       this.onFinish = this.onFinish.bind(this)
    }
    state = {
        isLogin: false
    }

    async onFinish(values: any) {
        console.log('Success:', values);
        const {data: res} = await axios.post('/api/login', qs.stringify({
            password: values.password
        }), {
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
        console.log(res);
        if (res.data) {
            this.setState({
                isLogin: true
            })
        } else {
            message.error("登录失败")
        }
        console.log(res);
    };

    onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };

    render() {
        const {isLogin} = this.state
        return (
            isLogin ? <Redirect to="/"/> :
                <div className="login-page">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
        );
    }

}

export default NormalLoginForm

// import React from 'react';
// import './login.css'
//
// function App() {
//   return (
//         <div className="login-page">
//
//         </div>
//
//   );
// }
//
// export default App;
