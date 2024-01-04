import React,{ useState} from 'react';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {

    const navigate = useNavigate();

    const Jumptologin = () => {
    
        navigate('/Login');
    };

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('')
    const [email,setEmail] = useState('')
    

    const handleSignup = async () => {
      try{
          const response = await axios.post('http://localhost:8080/api/register',{
              userName:userName,
              password:password,
              email:email
          });

          if(response.data.code === '200'){
            setMessage('Signup successfull')
          }else {
            setMessage('Existed account')
          }

      }catch(error){
          console.log("error:",error)
      }
      
  }

    return (
        <div className='signup-theme' >
            <div className='register-box'>
                <h1>Sign up</h1>
                <input className='signup-input' 
                    type='email' 
                    placeholder='Email'
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                    />
                <input className='signup-input' 
                    type='password' 
                    placeholder='Password'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <input className='signup-input' 
                    type='email' 
                    placeholder='Email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                <button className='signup-button' onClick={handleSignup}>Sign up</button>
                <strong>{message}</strong>
                <div className='jumptologin'>
                    <h2>I already have a account</h2>
                    <button onClick={Jumptologin} className='jumptosignup-button'>Log in</button>
                </div>
                

            </div>
        </div>
    );
}
