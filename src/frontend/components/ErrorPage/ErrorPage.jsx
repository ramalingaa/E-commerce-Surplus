import React from 'react'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className = "error-page-wrapper">
        <p className="error404-text">404</p>
        <p>The page you are looking is not found, please return to home</p>
        <Link to = "/" className="btn primary">Home</Link>
    </div>
  )
}

export default ErrorPage