import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  console.log(hasError)

  useEffect(() => {
    setHasError(false);
  }, []);

  const handleOnError = () => {
    setHasError(true);
  };

  if (hasError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div onError={handleOnError}>
      {children}
    </div>
  );
}

export default ErrorBoundary;