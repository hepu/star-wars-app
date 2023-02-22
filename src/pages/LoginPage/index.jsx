import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { useAuth } from "../../hooks/useAuth";

const LoginPage = ({}) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { state } = useLocation();
  
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await login(username, password)
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Body>
            <h2>Star Wars</h2>
            <Form action="/" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter username"
                  value={username}
                  onChange={onUsernameChange}
                  required={true}
                  disabled={submitting}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onPasswordChange}
                  required={true}
                  disabled={submitting}/>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={submitting}>
                Log In
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  )
}

export default LoginPage