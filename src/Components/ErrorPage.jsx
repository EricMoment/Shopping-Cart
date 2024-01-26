import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <div className='errorPage'>
      <h1>Oh no, this route does not exist!</h1>
      <a href="/">
        Back to Home Page
      </a>
    </div>
  );
};

export default ErrorPage;