import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

import './home.css'

const HomePage = ({}) => {
  const navigate = useNavigate()

  const onLogin = async () => {
    navigate('/login')
  }

  return (
    <div id="home">
      Home
      <Button variant="primary" type="submit" onClick={onLogin}>
        Log In
      </Button>
    </div>
  )
}

export default HomePage