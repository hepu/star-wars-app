import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'

export default function ErrorPage() {
  return (
    <div id="error-page" style={{ color: '#EEE' }}>
      <Container>
        <div className='d-flex justify-content-center align-items-center flex-column pt-4'>
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <Link to="/">Go back to Home page</Link>
        </div>
      </Container>
    </div>
  );
}