import React,{useState} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card } from 'antd';
import useMessage from "antd/es/message/useMessage";



export default function Login() {

    
    const navigate = useNavigate();

    const Jumptosignup = () => {
        navigate('/Signup');
    };

    const JumptoAdmin = () => {
        navigate('/Admin')
    };

    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageApi, contextHolder] = useMessage();
    
    const handleLogin = async () => {
        
        try{
            const response = await axios.post('http://localhost:8080/api/login',{
                username:username,
                password:password,
            });

            if(response.data.code === "200"){
                localStorage.setItem('token', response.data.token); 
                console.log(response.data.token)  
                JumptoAdmin()
            }else if (response.data.code === "400") {
                messageApi.error(
                "Tài khoản hoặc mật khẩu không chính xác"
            )
            }
            
        }catch(error){
            console.log(error)
        }        
    }    

    return (
        <>
            {contextHolder}
            <Row justify={"center"} align="middle" style={{ minHeight: '80vh' }}>
                <Col xs={24} sm={18} md={14} lg={10} xl={8} >
                    <Card title="Đăng Nhập">
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input
                                    type='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            >
                                <Input
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" onClick={handleLogin} className="login-form-button">
                                    Log in
                                </Button>
                                <span style={{ margin: '0 8px' }}>Or</span>
                                <a onClick={Jumptosignup} href="">
                                    Register now!
                                </a>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
