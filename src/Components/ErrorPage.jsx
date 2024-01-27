import './ErrorPage.css'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='errorPage'>
      <h1>Oh no, this route does not exist!</h1>
      <Link to="/">
        Back to Home Page
      </Link>
    </div>
  );
};

export default ErrorPage;