import React,{ useState} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card, notification } from 'antd';
import useMessage from "antd/es/message/useMessage";


export default function Signup() {

    const navigate = useNavigate();

    const Jumptologin = () => {
    
        navigate('/Login');
    };

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('')
    const [email,setEmail] = useState('')
    const [notificationApi, contextHolder] = notification.useNotification();


    const handleSignup = async () => {
      try{
          const response = await axios.post('http://localhost:8080/api/register',{
              userName:userName,
              password:password,
              email:email
          });

          if (response.data.code === '200') {
                notificationApi.success({
                    message: "Đăng ký thành công",
                    duration: 5
                })
            } else {
                notificationApi.error({
                    message: "Tài khoản đã tồn tại",
                    duration: 5
                })
            }

      }catch(error){
          console.log("error:",error)
      }
      
  }

    return (
        <>
            {contextHolder}
            <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
                <Col xs={24} sm={18} md={14} lg={10} xl={8}>
                    <Card title="Sign up">
                        <Form
                            name="normal_signup"
                            className="signup-form"
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
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    prefix={<UserOutlined className="site-form-item-icon" />}
                                    placeholder="Username"
                                />
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
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input a valid Email!',
                                    },
                                ]}
                            >
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    placeholder="Email"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Row justify="space-between">
                                    <Button
                                        type="primary"
                                        onClick={handleSignup}
                                        className="signup-form-button"
                                    >
                                        Sign up
                                    </Button>
                                    <Button onClick={Jumptologin} className="jumptosignup-button">
                                        I already have an account
                                    </Button>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
