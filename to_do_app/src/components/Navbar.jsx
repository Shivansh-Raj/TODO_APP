import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './frontToBackend/constants'

function Navbar() {
  const navigate = useNavigate()
  const GotoTasklist = () => {
    navigate('/TaskList')
  }
  const GotoSignup = () => {
    localStorage.setItem(ACCESS_TOKEN,"")
    localStorage.setItem(REFRESH_TOKEN,"")
    navigate('/signup')
  }
  const GotoDash = () => {
    navigate('/')
  }
  return (
    <>
      <nav className="nb">
        <ul className="nb_menu">
          <li className="nb_item" onClick={GotoDash}>Dashboard</li>
          <li className="nb_item" onClick={GotoTasklist}>Task list</li>
        </ul>
        <button className="signout-btn" onClick={GotoSignup}>Sign out</button>
      </nav>
    </>
  )
}

export default Navbar