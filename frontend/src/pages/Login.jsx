import React, { useState } from 'react';
import { useContext,useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {
    const [currentState, setCurrentState] = useState("Login");
    const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            if(currentState==='Sign Up'){
               const response=await axios.post(backendUrl+'/api/user/register',{name,email,password})
               if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
               }else{
                toast.error(response.data.message)
               }
            }
            else{ 
               const response=await axios.post(backendUrl+'/api/user/login',{email,password})
               if(response.data.success){
                setToken(response.data.token)
                localStorage.setItem('token',response.data.token)
               }else{
                toast.error(response.data.message)
               }
            }
        } catch (error) {
             console.log(error);
             toast.error(error.message)
        }
    };
    useEffect(() => {
      if(token){
        navigate('/')
      }
    }, [token])
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={onSubmitHandler} style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '8px', width: '320px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
                    {currentState}
                </p>

                {currentState === "Login"? '': 
                    <input 
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={inputStyle}
                    />
                }

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={inputStyle}
                />

                <p style={{ fontSize: '14px', color: '#0077cc', margin: '10px 0', cursor: 'pointer' }}>
                    Forgot your password?
                </p>

                <button type="submit" style={buttonStyle}>
                    {currentState === "Login" ? "Sign In" : "Sign Up"}
                </button>

                {currentState === "Login" ? (
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Don't have an account?{" "}
                        <span
                            style={{ color: "#0077cc", cursor: "pointer" }}
                            onClick={() => setCurrentState("Sign Up")}
                        >
                            Create Account
                        </span>
                    </p>
                ) : (
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Already have an account?{" "}
                        <span
                            style={{ color: "#0077cc", cursor: "pointer" }}
                            onClick={() => setCurrentState("Login")}
                        >
                            Login here
                        </span>
                    </p>
                )}
            </form>
        </div>
    );
};

// ✨ Inline styles
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px'
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
};

export default Login;
