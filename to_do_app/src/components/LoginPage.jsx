import React, { useEffect, useState } from 'react';
import './LogSign.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './frontToBackend/constants';
import api from './frontToBackend/api';

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()
    const GotoSignup = () => {
      navigate('/signup')
    }
    

    const submit = async () => {
      try {
        const res = await api.post('/api/token', {username, password});
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/")
      } catch (error) {
        alert("No user with that creadentials exist");
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
            <button type="submit" className="SL-button" onClick={handleSubmit}>Login</button>
          </form>
          <div className='SL-link'><p >Don't have an account?  </p><p className='SL_switch' onClick={GotoSignup}>Signup</p></div>
        </div>
      </div>
    );
  };

export default LoginPage;