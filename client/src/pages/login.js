import React,{useState} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



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
            }else if(response.data.code === "400"){
                setMessage("Đăng nhập không thành công")
            }
            
        }catch(error){
            console.log(error)
        }        
    }    

    return (
        <div className='login-theme' >
            
            <div className='register-box'>
                <h1>Login</h1>
                <input className='login-input' 
                    type='username' 
                    placeholder='username'
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                <input className='login-input' 
                    type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <button className='login-button' onClick={handleLogin}>Log in</button>
                <strong>{message}</strong>
                <div className='jumptosignup'>
                    <h2>Dont have account?</h2>
                    <button onClick={Jumptosignup} className='jumptosignup-button'>Sign up</button>
                </div>
                
            </div>
        </div>
    );
}
