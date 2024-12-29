import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './components/Dashboard'
import TaskList from './components/TaskList'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import './App.css'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route 
            path='/login'
            element={<LoginPage/>}
          />
          <Route 
            path='/signup'
            element={<SignupPage/>}
          />
          <Route 
            path='/'
            element={<Dashboard/>}
          />
          <Route 
            path='/tasklist'
            element={<TaskList/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
