import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { useAuth } from "../../hooks/useAuth";

const SignupPage = ({}) => {
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { signup } = useAuth();
  
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  
  const onUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signup(email, username, password)
    } catch (e) {
      setError(e)
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
            <h2 className="text-center mb-4 text-decoration-none">
              <Link to='/'>
                Star Wars
              </Link>
            </h2>
            <h5 className='text-dark text-center'>
              Sign Up
            </h5>
            {error && (
              <Alert variant='danger'>
                {error.message}
              </Alert>
            )}
            <Form action="/" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='text-dark'>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onEmailChange}
                  required={true}
                  disabled={submitting}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label className='text-dark'>Username</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter username"
                  value={username}
                  onChange={onUsernameChange}
                  required={true}
                  disabled={submitting}/>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className='text-dark'>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={onPasswordChange}
                  required={true}
                  disabled={submitting}/>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting && (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                )}
                Sign Up
              </Button>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  )
}

export default SignupPage