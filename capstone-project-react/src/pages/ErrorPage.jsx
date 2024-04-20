import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function ErrorPage() {

    return (
        <div className='PageDiv d-flex flex-column align-items-center'>
            <h1 className='OrangeText ErrorPage'>Something went wrong</h1>
            <Link to="/"><Button variant="primary" className='BlueButton'>Please go back</Button></Link>
        </div>
      );
}

export default ErrorPage;