import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import MenuBar from '../../components/MenuBar'

import './home.css'

const HomePage = ({}) => {
  return (
    <div id="home">
      <MenuBar />
      <Container>
      <h2 className="pt-4">
        Welcome to the Star Wars API inspector!
      </h2>
      <p>
        Please <Link to="/login">sign in</Link> to get started and view all the information related to Star Wars
      </p>
      </Container>
    </div>
  )
}

export default HomePage