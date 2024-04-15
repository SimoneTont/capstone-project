import React from 'react';
import { Link } from 'react-router-dom';
function ErrorPage() {

    return (
        <div className='PageDiv'>
            <p>Something went wrong, <Link to="/">please go back </Link></p>
        </div>
      );
}

export default ErrorPage;