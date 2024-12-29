import React, { useEffect, useState } from 'react';
import './LogSign.css';
import { Navigate, useNavigate } from 'react-router-dom';
import api from './frontToBackend/api';

const SignupPage = () => {
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const GotoLogin = () => {
      navigate('/Login')
    }

    const submit = async () => {
      try {
        const res = await api.post('/api/user/register', {username, password});
        alert("Succesfully created User")
        // localStorage.setItem(ACCESS_TOKEN, res.data.access)
        // localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        // navigate("/")
      } catch (error) {
        // alert(error+"  "+username+"  "+password);
        alert("User with that name already exist!!!")
      }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            alert("Both username and password are required.");
            return;
        }
        submit();
    }
    const handleName = (e) => {
      setUsername(e.target.value)
    }
    const handlePassword = (e) => {
      setPassword(e.target.value)
    }
    return (
      <div className="SL-container">
        <div className="SL-card">
          <h1 className="app-title">To-Do App</h1>
          <form className="SL-form">
            <div className="form-group">
              <label >Email</label>
              <input
                type="text"
                id="email"
                name="username"
                placeholder="Enter your email"
                onChange={handleName}
                required
                />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={handlePassword}
                required
              />
            </div>
            <button type="submit" className="SL-button" onClick={handleSubmit}>SignUp</button>
          </form>
          <div className='SL-link'><p >Already have an account?  </p> <p className='SL_switch' onClick={GotoLogin}>Login</p></div>
        </div>
      </div>
    );
  };

export default SignupPage;