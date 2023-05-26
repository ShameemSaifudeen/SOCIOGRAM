import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      setErrorInfo(errorInfo);

      // You can also log the error to an error tracking service here
      // For example: Sentry.captureException(error);
    };

    window.addEventListener('error', handleErrors);
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    // You can render a fallback UI here
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
